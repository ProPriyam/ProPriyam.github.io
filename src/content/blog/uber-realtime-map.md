---
title: "Uber App's Real-Time Map"
description: "A breakdown of how Uber engineered its real-time map system to handle millions of drivers and riders simultaneously."
date: 2025-01-15
---

If you've ever opened Uber and watched little cars glide smoothly across the map, it feels almost trivial. But behind that "simple" experience is a system that's doing an insane amount of work quietly, efficiently, and at massive scale.

This post is a breakdown of how Uber engineered its real-time map system to handle **millions of drivers and riders simultaneously**, without melting its servers.

---

## From Polling to Push: Stop Asking, Start Telling

Early on, Uber used a **polling model**. The client (your phone) would constantly ask the server:

> "Any updates? Any updates? Any updates?"

That works... until you scale.

Polling wastes bandwidth, burns battery, and forces servers to answer questions even when nothing has changed. Uber flipped this model entirely and moved to a **push-based system**.

Now the logic is simple:

- The **server decides** when something meaningful changed
- The **server pushes** updates only when needed
- The client just listens

This alone removes a huge amount of unnecessary load.

---

## Decoupling the Problem: When, What, and How

At Uber's scale, even "pushing updates" is not a single concern. They broke it into three separate responsibilities:

### 1. When to Push - _Fireball_

Fireball is a microservice that listens to events like driver location updates.

It asks:

- Did the driver actually move?
- Did they move _enough_ to matter?

If a driver shifts a few centimeters, Fireball ignores it. If they've moved meaningfully, Fireball greenlights a push. This is classic **change-based throttling**, and it saves massive compute.

---

### 2. What to Push - _API Gateway_

Once Fireball decides an update is worth sending, it doesn't assemble the full payload itself.

Instead, it sends **minimal data** to Uber's API Gateway. The gateway's job is to:

- Enrich that minimal signal
- Fetch all required context
- Build the full client-ready payload

This keeps Fireball lightweight and scalable.

---

### 3. How to Push - _Ramen Servers_

Finally, the client connects to a specialized push server (internally called a _Ramen server_), which streams the prepared payload to the device.

At this point, the update is fast, targeted, and efficient.

---

## The Real Scaling Problem: Finding Nearby Drivers

Pushing updates is only half the battle. Uber constantly needs to answer questions like:

> "Which drivers are near this rider _right now_?"

At small scale, you could just calculate distances:

- Rider -> Driver A
- Rider -> Driver B
- Rider -> Driver C  
  ...repeat millions of times.

At Uber's scale, this becomes **computationally impossible**.

---

## Spatial Partitioning: Stop Comparing Everything

Uber's solution is **spatial partitioning**.

Instead of comparing every driver to every rider:

- Divide the world into small regions
- Only consider drivers in nearby regions

Now the problem becomes:

> "Which drivers are in the same or neighboring regions?"

This dramatically cuts down the search space.

---

## Why Squares Don't Work (Corner Bias)

The obvious choice is a grid of squares but squares have a nasty issue.

Diagonal neighbors are farther away than horizontal or vertical ones. This creates **corner bias**, where distance comparisons become uneven and inaccurate.

Uber wanted something closer to a true radius-based approximation.

---

## Enter H3: Hexagons Everywhere

Uber built **H3**, an open-source **hexagonal spatial indexing system**.

Why hexagons?

- All neighbors are roughly equidistant
- Radius queries are more consistent
- No corner bias

The world is divided into hexagonal cells at multiple resolutions. Finding nearby drivers becomes a matter of:

- Locating the rider's hex
- Expanding outward to neighboring hexes

Fast, predictable, and scalable.

---

## Making Movement Look Smooth (Because Humans Notice)

Raw GPS updates are noisy. If Uber just snapped a car from point A to point B every time a new update arrived, the map would look jittery and broken.

So Uber does two things:

### Dead Reckoning

Between updates, the system predicts where the driver _should_ be based on:

- Last known position
- Speed
- Direction

### Kalman Filters

Predictions are then combined with real GPS measurements using **Kalman filters**, which:

- Smooth out noise
- Correct predictions over time
- Avoid sudden jumps

The result: cars that glide naturally across the map, even when updates are delayed.

---

## The Big Picture

What makes Uber's real-time map impressive isn't any single trick - it's the system design:

- Push, not poll
- Separate decisions from execution
- Spatial indexing instead of brute force
- Prediction instead of constant updates
- Smoothing instead of raw data

All of this exists so you can casually glance at your phone and think:

> "Yep, my Uber's 3 minutes away."
