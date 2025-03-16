---
title: "Automated Time Series Data Extraction from Scientific Papers"
excerpt: "A comprehensive pipeline for automating the extraction and processing of time series data from scientific papers, streamlining the process from arXiv downloads to usable data. <br/><img src='/images/paper_extraction/diagram_5x3.png'>"
collection: projects
date: 2024-03-16
tags:
  - Data Extraction
  - Scientific Papers
  - Time Series Analysis
  - Automation
  - Image Processing
---

This project introduces a comprehensive pipeline designed to automate the extraction and processing of time series data from scientific papers. The pipeline streamlines the process of downloading papers from arXiv, filtering relevant PDFs, extracting images, and converting these images into usable time series data.

## Pipeline Components

The system consists of seven key components working in sequence:

1. **arXiv Paper Download**: Using `downloading_arxiv.py` to fetch papers from the arXiv repository
2. **PDF Filtering**: Implementing `filtering_pdfs.py` to select relevant documents based on defined criteria
3. **Image and Caption Extraction**: Utilizing PDFFigures2 for accurate extraction of figures and their associated captions
4. **PDF Processing**: Employing `crop2pdf.py` for precise document cropping and preparation
5. **Line Chart Identification**: Using `isLine.py` to detect and classify line charts
6. **SVG Conversion**: Converting PDFs to SVG format via `pdf2svg.py`
7. **Data Extraction**: Final processing using `svg2time_series.py` to convert SVG files into structured time series data

## Key Features

- **Fully Automated Workflow**: Minimal manual intervention required from paper download to data extraction
- **Modular Architecture**: Each component can be used independently or as part of the complete pipeline
- **Robust Processing**: Handles various paper formats and figure styles
- **Scalable Solution**: Capable of processing large volumes of scientific papers efficiently

![Pipeline Diagram](/images/paper_extraction/diagram.png)

This automated approach significantly reduces the manual effort required to gather and analyze time series data presented in scientific literature, making it an invaluable tool for researchers and data scientists working with published research data.
