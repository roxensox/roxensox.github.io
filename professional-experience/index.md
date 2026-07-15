---
layout: default
title: Professional Experience
permalink: /professional-experience/
---

## Professional Experience

My professional software work has focused on practical internal tools for aerospace manufacturing quality, audit support, traceability, and reporting automation. These projects were built around real operational workflows, often requiring collaboration with inspectors, quality technicians, engineers, and other stakeholders.

### Collins Aerospace

At Collins Aerospace, I developed tools that helped manufacturing and quality teams reduce manual effort, improve data integrity, and make process information easier to retrieve and trust.

| Problem | Solution | Tools | Impacts |
|-|-|-|-|
| Document relationships are hard to track for audits | Built a document dependency graph that visualized and propagated non-compliance notifications through parent-child relationships | C#, Windows Forms | Traceability, data integrity, audit support |
| Products are being shipped with incorrect serial numbers attached, and the operators responsible can't be identified | Integrated with SAP to retrieve expected serial numbers, stored them with SQLite, and built a barcode-scanning application that logged operator changes for traceability | C++, Windows Forms, SQLite | Traceability, data integrity, asset/process tracking |
| CMM reports are difficult to look up on the computer, making it time-consuming for inspectors to verify CMM errors | Created a shell script to open a CMM report based on various file identifiers in the user's text editor of choice | PowerShell, Windows Forms | Data integrity, traceability, process improvement |
| New inspectors take a long time to learn to write QNs and need reference material to work from | Created a GUI to look up QNs by part number and import the necessary data into a text file for inspectors to reference | Python, Tkinter, Win32COM | Data integrity, process improvement |
| Processing document repository update reports takes several hours a week and requires excessive training for a new worker to take over | Created a Python script that processes report data and stores it in the Excel tracker | Python, Win32COM | Audit support, data integrity, process improvement |

### Earlier Professional Work

Before moving into aerospace manufacturing, I worked as an English for Science, Math, and Technology instructor at Khon Kaen Wittayayon School in Thailand. While there, I developed a Flask web application for recording student grades and exporting data into the school's required reporting format.

I also worked at Boeing in an aircraft manufacturing role focused on process adherence, documentation accuracy, and quality standards. That experience strengthened my understanding of regulated manufacturing environments and the importance of reliable process data.
