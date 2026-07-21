# Security Policy

## Supported Versions
Only the latest major version is actively supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within Astra, please DO NOT report it via public GitHub issues. 

Instead, please send an email directly to security@devagyarai.com. We treat all security reports with the highest priority and will attempt to address the issue immediately.

## Data Privacy & API Keys (BYOK)
Astra utilizes a **Bring Your Own Key (BYOK)** architecture. 
- API Keys are stored **exclusively** in your browser's local storage.
- Astra backend (Next.js Edge routes) acts strictly as a secure proxy and does not store, log, or persist your keys or decision data.
- All decisions are persisted locally via IndexedDB/LocalStorage unless explicitly exported by the user.
