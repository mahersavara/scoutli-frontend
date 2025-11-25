# Scoutli Frontend (Angular)

This repository contains the Single Page Application (SPA) frontend for Scoutli, built with **Angular** and **TypeScript**.

## Technology Stack

*   **Framework:** Angular 17+
*   **Styling:** SCSS, Bootstrap (via `ngx-bootstrap` or native classes)
*   **Map Library:** Leaflet (`ngx-leaflet`)
*   **State Management:** RxJS (BehaviorSubject)

## Project Structure

```
src/app/
├── components/         # Shared UI components (Navbar, Footer, Map...)
├── features/           # Feature modules (Home, Auth, Discovery...)
├── core/               # Singleton services, guards, interceptors
│   ├── services/       # API clients (AuthService, DiscoveryService)
│   ├── guards/         # Route guards (AuthGuard)
│   └── interceptors/   # HTTP Interceptors (JwtInterceptor)
└── shared/             # Shared pipes, directives, models
```

## Getting Started

### Prerequisites

*   Node.js (LTS version) and npm.
*   Angular CLI installed globally: `npm install -g @angular/cli`

### Running the Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## CI/CD

This repository is integrated with GitHub Actions to build the application and package it into an Nginx-based Docker image for deployment to AWS EKS.