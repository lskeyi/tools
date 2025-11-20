# System Architecture

## Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] --> B[HTML/CSS/JS]
        B --> C[User Interface]
    end
    
    subgraph "Frontend Components"
        C --> D[URL Tool]
        C --> E[Base64 Tool]
        C --> F[Unicode Tool]
        C --> G[Hash Tool]
        C --> H[Diff Tool]
    end
    
    subgraph "API Layer"
        D --> I[/api/url/*]
        E --> J[/api/base64/*]
        F --> K[/api/unicode/*]
        G --> L[/api/md5 & /api/sha256]
        H --> M[/api/diff]
    end
    
    subgraph "Backend Server"
        I --> N[Express.js Server]
        J --> N
        K --> N
        L --> N
        M --> N
        N --> O[Node.js Runtime]
    end
    
    subgraph "Processing"
        O --> P[URL Encoding/Decoding]
        O --> Q[Base64 Encoding/Decoding]
        O --> R[Unicode Conversion]
        O --> S[Crypto Hashing]
        O --> T[Text Comparison]
    end
    
    style A fill:#d4af37,stroke:#b8941f,color:#000
    style N fill:#d4af37,stroke:#b8941f,color:#000
    style O fill:#d4af37,stroke:#b8941f,color:#000
```

## Deployment Architecture

```mermaid
graph LR
    subgraph "Internet"
        A[User] --> B[Domain Name]
    end
    
    subgraph "Ubuntu Server"
        B --> C[Nginx :80/443]
        C --> D[Reverse Proxy]
        D --> E[Node.js App :3000]
        E --> F[PM2 Process Manager]
        F --> G[Application Instances]
    end
    
    subgraph "Security"
        H[Firewall UFW]
        I[SSL Certificate]
        J[Let's Encrypt]
    end
    
    C -.-> H
    C -.-> I
    I -.-> J
    
    style C fill:#d4af37,stroke:#b8941f,color:#000
    style E fill:#d4af37,stroke:#b8941f,color:#000
    style F fill:#d4af37,stroke:#b8941f,color:#000
```

## Request Flow

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant N as Nginx
    participant S as Node.js Server
    participant P as Processing Module
    
    U->>B: Enter text & click encode
    B->>B: Validate input
    B->>N: POST /api/base64/encode
    N->>S: Forward request
    S->>P: Process encoding
    P->>S: Return result
    S->>N: JSON response
    N->>B: Forward response
    B->>B: Display result
    B->>U: Show notification
```

## Component Interaction

```mermaid
graph TD
    subgraph "Frontend"
        A[index.html] --> B[styles.css]
        A --> C[script.js]
        B --> D[Dark Theme]
        B --> E[Gold Accents]
        C --> F[Event Handlers]
        C --> G[API Calls]
    end
    
    subgraph "Backend"
        G --> H[Express Routes]
        H --> I[URL Handler]
        H --> J[Base64 Handler]
        H --> K[Unicode Handler]
        H --> L[Hash Handler]
        H --> M[Diff Handler]
    end
    
    subgraph "Node Modules"
        I --> N[encodeURIComponent]
        J --> O[Buffer]
        K --> P[String Methods]
        L --> Q[Crypto Module]
        M --> R[Custom Algorithm]
    end
    
    style D fill:#d4af37,stroke:#b8941f,color:#000
    style E fill:#d4af37,stroke:#b8941f,color:#000
    style H fill:#d4af37,stroke:#b8941f,color:#000
```

## File Structure

```
┌─────────────────────────────────────┐
│         Project Root                │
├─────────────────────────────────────┤
│                                     │
│  📄 server.js                       │
│  ├─ Express setup                   │
│  ├─ API routes                      │
│  └─ Server initialization           │
│                                     │
│  📄 package.json                    │
│  └─ Dependencies & scripts          │
│                                     │
│  📁 public/                         │
│  ├─ 📄 index.html                   │
│  │  ├─ Header                       │
│  │  ├─ Navigation                   │
│  │  ├─ Tool sections                │
│  │  └─ Footer                       │
│  │                                  │
│  ├─ 📄 styles.css                   │
│  │  ├─ Variables                    │
│  │  ├─ Layout                       │
│  │  ├─ Components                   │
│  │  ├─ Animations                   │
│  │  └─ Responsive                   │
│  │                                  │
│  └─ 📄 script.js                    │
│     ├─ Navigation                   │
│     ├─ API functions                │
│     ├─ Utilities                    │
│     └─ Event handlers               │
│                                     │
│  📄 deploy.sh                       │
│  └─ Automated deployment            │
│                                     │
│  📄 nginx.conf                      │
│  └─ Reverse proxy config            │
│                                     │
│  📄 Documentation                   │
│  ├─ README.md                       │
│  ├─ QUICKSTART.md                   │
│  ├─ DEPLOYMENT_CHECKLIST.md         │
│  ├─ PROJECT_SUMMARY.md              │
│  └─ ARCHITECTURE.md                 │
│                                     │
└─────────────────────────────────────┘
```

## Data Flow

```mermaid
flowchart TD
    A[User Input] --> B{Input Validation}
    B -->|Valid| C[Send to API]
    B -->|Invalid| D[Show Error]
    C --> E[Express Route Handler]
    E --> F{Route Type}
    F -->|Encode| G[Encoding Function]
    F -->|Decode| H[Decoding Function]
    F -->|Hash| I[Hashing Function]
    F -->|Diff| J[Comparison Function]
    G --> K[Process Data]
    H --> K
    I --> K
    J --> K
    K --> L[Return JSON]
    L --> M[Update UI]
    M --> N[Show Notification]
    N --> O[Enable Copy Button]
    
    style A fill:#d4af37,stroke:#b8941f,color:#000
    style K fill:#d4af37,stroke:#b8941f,color:#000
    style M fill:#d4af37,stroke:#b8941f,color:#000
```

## Technology Stack Layers

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  HTML5 | CSS3 | Vanilla JavaScript  │
│  Dark Theme | Gold Accents          │
└─────────────────────────────────────┘
              ↕
┌─────────────────────────────────────┐
│         Application Layer           │
│  Express.js | RESTful API           │
│  Route Handlers | Middleware        │
└─────────────────────────────────────┘
              ↕
┌─────────────────────────────────────┐
│         Business Logic Layer        │
│  Encoding/Decoding | Hashing        │
│  Text Comparison | Validation       │
└─────────────────────────────────────┘
              ↕
┌─────────────────────────────────────┐
│         Runtime Layer               │
│  Node.js | Built-in Modules         │
│  Crypto | Buffer | String           │
└─────────────────────────────────────┘
```

## Deployment Flow

```mermaid
flowchart LR
    A[Source Code] --> B[Git Repository]
    B --> C[Ubuntu Server]
    C --> D[Run deploy.sh]
    D --> E[Install Node.js]
    D --> F[Install Dependencies]
    D --> G[Install PM2]
    E --> H[Start Application]
    F --> H
    G --> H
    H --> I[PM2 Process]
    I --> J[Application Running]
    J --> K{Add Nginx?}
    K -->|Yes| L[Configure Nginx]
    K -->|No| M[Direct Access :3000]
    L --> N[Reverse Proxy :80]
    N --> O{Add SSL?}
    O -->|Yes| P[Let's Encrypt]
    O -->|No| Q[HTTP Only]
    P --> R[HTTPS :443]
    
    style D fill:#d4af37,stroke:#b8941f,color:#000
    style H fill:#d4af37,stroke:#b8941f,color:#000
    style J fill:#d4af37,stroke:#b8941f,color:#000
```

## Security Architecture

```mermaid
graph TB
    subgraph "External"
        A[Internet Traffic]
    end
    
    subgraph "Security Layers"
        A --> B[Firewall UFW]
        B --> C[Nginx]
        C --> D[SSL/TLS]
        D --> E[Rate Limiting]
        E --> F[Input Validation]
    end
    
    subgraph "Application"
        F --> G[Express.js]
        G --> H[Error Handling]
        H --> I[Response]
    end
    
    style B fill:#4caf50,stroke:#2e7d32,color:#fff
    style D fill:#4caf50,stroke:#2e7d32,color:#fff
    style F fill:#4caf50,stroke:#2e7d32,color:#fff
```

## Performance Optimization

```mermaid
mindmap
  root((Performance))
    Frontend
      Minimal JS
      CSS Animations
      No Framework
      Lazy Loading
    Backend
      Express.js
      Fast Processing
      Efficient Routes
      Error Handling
    Deployment
      PM2 Cluster
      Nginx Caching
      Gzip Compression
      CDN Ready
    Monitoring
      PM2 Logs
      Error Tracking
      Performance Metrics
      Health Checks
```

## Scalability Options

```
Single Server (Current)
┌──────────────────┐
│   Ubuntu Server  │
│   ├─ Nginx       │
│   └─ Node.js     │
└──────────────────┘

Load Balanced (Future)
┌──────────────────┐
│  Load Balancer   │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│Server1│ │Server2│
└───────┘ └───────┘

Containerized (Future)
┌──────────────────┐
│   Docker Host    │
│  ├─ Container 1  │
│  ├─ Container 2  │
│  └─ Container N  │
└──────────────────┘
```

---

This architecture provides:
- ✅ Scalability
- ✅ Maintainability
- ✅ Security
- ✅ Performance
- ✅ Reliability
