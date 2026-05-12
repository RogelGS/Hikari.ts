# 🌟 Hikari.ts - Multifunctional Discord Bot

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/Version-v0.1.0--alpha-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Bun](https://img.shields.io/badge/Runtime-Bun-black?style=flat-square&logo=bun)

Hikari es un bot de Discord de alto rendimiento construido con una arquitectura híbrida moderna, separando la interacción de red del procesamiento lógico y la persistencia de datos.

## 🚀 Stack Tecnológico

| Componente | Tecnología | Badge |
| :--- | :--- | :--- |
| **Runtime** | Bun | ![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat-square&logo=bun&logoColor=white) |
| **Lenguaje** | TypeScript | ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white) |
| **Bot Lib** | Discord.js | ![Discord.js](https://img.shields.io/badge/discord.js-5865F2?style=flat-square&logo=discord&logoColor=white) |
| **Backend** | Spring Boot | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white) |
| **Database** | MariaDB | ![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb&logoColor=white) |
| **DevOps** | Docker | ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white) |

---

## 🏗️ Arquitectura del Sistema (Híbrida)

El proyecto utiliza un modelo **Event-Driven Layered**:
1.  **Capa de Entrada (Bot):** Reacciona a eventos de Discord.
2.  **Capa de Negocio (API):** Procesa la lógica y reglas.
3.  **Capa de Datos (DB):** Persistencia relacional en MariaDB.

---

## 🚦 Guía de Ejecución

### 1. Configuración Inicial
Antes de ejecutar cualquier componente, prepara las variables de entorno:
```bash
cp .env.example .env
# Edita el archivo .env con tu DISCORD_TOKEN real
```

### 2. Ejecución Orquestada (Recomendado)
Ideal para producción o pruebas integradas. Docker se encarga de conectar la base de datos con la API y el Bot.

*   **Levantar todo el stack:**
    ```bash
    docker compose up --build
    ```
*   **Levantar solo un servicio (ej: la base de datos):**
    ```bash
    docker compose up db -d
    ```

### 3. Ejecución Individual (Modo Desarrollo)

#### 🤖 Discord Bot
Ubicación: `/bot`
Requiere [Bun](https://bun.sh/) instalado localmente.
```bash
cd bot
bun install        # Instala dependencias exactas
bun dev            # Inicia con hot-reload (watch mode)
bun run lint       # Verifica calidad de código
bun run format     # Aplica formato Prettier
```

#### ☕ Spring Boot API
Ubicación: `/api`
Requiere JDK 21. No necesitas instalar Maven (usa el wrapper incluido).
```bash
cd api
./mvnw spring-boot:run
```
*Nota: La API intentará conectarse a MariaDB en `localhost:3306` si la corres localmente. Asegúrate de tener el contenedor de `db` encendido.*

#### 🗄️ Base de Datos
Ubicación: `/database`
Los scripts SQL en esta carpeta se ejecutan automáticamente al iniciar el contenedor por primera vez gracias al mapeo en `docker-compose.yml`:
*   `./database:/docker-entrypoint-initdb.d`

---

## 🛠️ Estructura del Workspace

```text
.
├── bot/               # TypeScript Client (Handler de eventos y comandos)
│   ├── src/index.ts   # Punto de entrada
│   ├── eslint.config.js # Configuración ESLint 9
│   └── .prettierrc    # Reglas de estilo
├── api/               # Backend Java (Lógica y REST)
│   ├── src/main/java  # Código fuente Spring Boot
│   └── pom.xml        # Dependencias Maven
├── database/          # SQL scripts (CREATE.sql)
└── docker-compose.yml # Definición de red y servicios
```

---

## 💎 Estándares de Calidad
*   **Fijación de Versiones:** Todas las dependencias en `package.json` están fijadas a versiones exactas para evitar inconsistencias.
*   **Linting:** Pre-configurado con `typescript-eslint` y `prettier`.
