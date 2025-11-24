import sys

def extract_text(file_path):
    text = ""
    try:
        import pypdf
        reader = pypdf.PdfReader(file_path)
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except ImportError:
        pass

    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(file_path)
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except ImportError:
        pass

    return "ERROR: No suitable PDF library found (pypdf or PyPDF2)."

if __name__ == "__main__":
    files = [
        "Dilshad_Liyawdeen-Network_Administrator_Resume_250811_180305.pdf",
        "Profile.pdf"
    ]
    
    for f in files:
        print(f"--- START OF {f} ---")
        try:
            content = extract_text(f)
            print(content)
        except Exception as e:
            print(f"Error extracting {f}: {e}")
        print(f"--- END OF {f} ---")
