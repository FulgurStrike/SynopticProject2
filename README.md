# Agricultral Database System (Name WIP)

## Initial Main Idea
A website which aims to educate people in Makers Valley on how to start their own urban farm to help combat the rising food security issue.

## Feature ideas
- Recommended crop finder using data science principles such as KNN (Thank you Hugh) (primary)
- Crop database - Shows information about crops regularly used grown in Johannesburg (primary)
- Use weather API to gather rainfall data which farmers can use in conjuction with the recommended crop finder (secondary)
- Messaging system to facilitate trading between farmers (primary/secondary)
- Swap shop inventory information page (secondary/primary)


**PLEASE ADD ANYTHING I HAVE MISSED**


## HOW TO SET UP VIRTUAL ENVIRONMENT FOR PYTHON RECOMMENDATION ALGORITHM

**check if python is installed**
```bash
python --version
```

**if not, download from** [https://www.python.org/downloads/]
**and make sure to check \"Add to PATH\" during installation**


**create and activate virtual environment**
```bash
python -m venv venv
```

**windows:**
```
venv\Scripts\activate
    -if you're on windows and get this error:
    venv\Scripts\activate : File ... cannot be loaded because running scripts is disabled on this system.
    run this line then try again:
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
# mac/linux:
```bash
source venv/bin/activate
```
# install dependencies
```bash
pip install -r requirements.txt
```
