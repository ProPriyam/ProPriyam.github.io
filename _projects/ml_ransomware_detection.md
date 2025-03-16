---
title: "ML-Based Ransomware Detection in Virtual Machines"
excerpt: "A machine learning approach to detect ransomware attacks in VMware virtual machines using VMDK analysis and real-time monitoring. <br/><img src='/images/ml_ransomware_detection/netApp.png'>"
collection: projects
date: 2024-03-16
tags:
  - Machine Learning
  - Cybersecurity
  - Virtual Machines
  - Ransomware Detection
---

Ransomware attacks pose significant threats to virtual machines in cloud environments, targeting vulnerabilities in cloud storage to encrypt files and disrupt operations.
This project presents a two-phase machine learning-powered detection system specifically designed for VMware VMDKs (Virtual Machine Disk Files). In the initial phase, the system monitors VM snapshot disk files for anomalies, while the second phase delves into the file structure, employing heuristic and signature-based methods to enhance protection against ransomware.

While the code developed for this project is proprietary to NetApp, it is not overly complex to recreate, allowing for broader application in similar contexts. For a comprehensive understanding of the methodology, results, and implications, please refer to the project poster below, which includes detailed explanations and diagrams.

![Project Poster](/images/ml_ransomware_detection/Ransomware_Detection_Poster.png)

## Key Engineering Features

- **Two-Phase Detection System**: Combines anomaly detection and file structure analysis.
- **VMDK File Parsing**: Converts raw VMDK formats for easier feature extraction.
- **Machine Learning Model**: Utilizes advanced algorithms for high accuracy in ransomware detection.
- **Real-Time Monitoring**: Capable of detecting ransomware activity as it occurs.
