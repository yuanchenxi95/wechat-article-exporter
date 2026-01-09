# Development Setup Guide

This guide will help you set up the development environment for the **WeChat Article Exporter** project.

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: Version **22** or higher (Required).
- **pnpm**: The package manager used in this project.
- **Git**: For version control.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yuanchenxi95/wechat-article-exporter.git
    cd wechat-article-exporter
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

## Running Locally

To start the development server with hot-reload:

```bash
pnpm run dev
```

The server will be accessible at `http://localhost:3000`.

### Debug Mode

To run with Node.js inspector enabled (for debugging server-side code):

```bash
pnpm run debug
```

## Building for Production

To build the application for production:

```bash
pnpm run build
```

The output will be in the `.output` directory.

You can preview the production build locally:

```bash
node .output/server/index.mjs
```

## Database & Persistence

- The application uses `lowdb` for local data persistence (stored in `server/data/db.json`).
- This file is automatically created when you run the application and log in.
- `server/data/db.json` is git-ignored to prevent committing sensitive credentials.

## API Documentation

See [API_USAGE.md](./API_USAGE.md) for details on how to use the HTTP API.
