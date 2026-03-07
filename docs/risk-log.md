# Risk Log

Risk  
File tampering detection.

Issue  
Earlier versions did not detect minor changes.

Fix  
Using SHA-256 hashing ensures any small change produces a completely different hash.