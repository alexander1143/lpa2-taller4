# 🎵 Guía Completa de la Aplicación - Música API Manager

## 📋 Índice
1. [Inicio Rápido](#inicio-rápido)
2. [Funcionalidades](#funcionalidades)
3. [Uso de la Aplicación](#uso-de-la-aplicación)
4. [Arquitectura](#arquitectura)

---

## 🚀 Inicio Rápido

### Iniciar el Servidor
```bash
cd /home/luisv/proyectos/lpa2-taller4
pnpm dev
```

### Acceder
Abre tu navegador en: **http://localhost:3000**

### Primera Vez
1. Serás redirigido a `/login`
2. Ve a la pestaña "Registrarse"
3. Crea una cuenta con:
   - Nombre completo
   - Email
   - Contraseña (mín. 6 caracteres)
4. Automáticamente iniciarás sesión

---

## ✨ Funcionalidades

### 🔐 1. Autenticación y Autorización

#### ✅ Características
- **Login**: Iniciar sesión con email y contraseña
- **Registro**: Crear nueva cuenta de usuario
- **Logout**: Cerrar sesión de forma segura
- **Persistencia**: La sesión se mantiene al recargar
- **Protección**: Todas las páginas requieren autenticación
- **Redirección**: Si no estás autenticado, te redirige a login

#### 🎨 UI de Usuario
- Avatar con iniciales en el sidebar
- Nombre y email del usuario
- Botón de cerrar sesión
- Validaciones en tiempo real
- Mensajes de error claros

---

### 🎵 2. Reproductor de Música

#### ✅ Características
- **Reproducción**: Play/Pause de canciones
- **Navegación**: Siguiente/Anterior canción
- **Progreso**: Barra de progreso interactiva
- **Volumen**: Control deslizante de volumen
- **Mute**: Botón de silenciar/reactivar
- **Queue**: Sistema de cola de reproducción
- **Fijo**: Reproductor fijo en la parte inferior

#### 🎮 Cómo Usar
1. Ve a **Canciones**
2. Haz clic en el botón ▶️ de cualquier canción
3. El reproductor aparece en la parte inferior
4. Controla: play/pause, volumen, progreso
5. La canción actual se muestra con su información

---

### 📊 3. Dashboard

#### ✅ Estadísticas en Tiempo Real
- **Total Usuarios**: Cantidad de usuarios registrados
- **Total Canciones**: Canciones en la biblioteca
- **Total Favoritos**: Marcadores de favoritos
- **Actividad Reciente**: Últimas acciones

---

### 🎼 4. Gestión de Canciones

#### ✅ Funcionalidades
- **Listar**: Ver todas las canciones con paginación
- **Crear**: Agregar nuevas canciones
- **Editar**: Modificar información de canciones
- **Eliminar**: Borrar canciones
- **Buscar**: Buscar por título
- **Reproducir**: Play directo desde la tabla

#### 📝 Campos
- Título (requerido)
- Artista
- Álbum
- Duración (en segundos)
- Año
- Género
- URL de audio

---

### 👥 5. Gestión de Usuarios

#### ✅ Funcionalidades
- **Listar**: Ver todos los usuarios
- **Crear**: Agregar nuevos usuarios
- **Editar**: Modificar información
- **Eliminar**: Borrar usuarios
- **Fecha de Registro**: Timestamp de creación

#### 📝 Campos
- Nombre completo (requerido)
- Correo electrónico (requerido, único)

---

### ❤️ 6. Gestión de Favoritos

#### ✅ Funcionalidades
- **Ver por Usuario**: Seleccionar usuario y ver sus favoritos
- **Agregar**: Marcar canciones como favoritas
- **Eliminar**: Quitar de favoritos
- **Detalles**: Ver información completa de cada canción favorita

#### 🎯 Información Mostrada
- Canción (título y artista)
- Álbum
- Duración
- Fecha en que se marcó como favorito

---

### 🌓 7. Tema Claro/Oscuro

#### ✅ Características
- **Toggle**: Botón en el header del sidebar
- **Persistencia**: Se guarda la preferencia
- **Sistema**: Puede seguir el tema del sistema
- **Transiciones**: Cambio suave entre temas

---

## 🎯 Uso de la Aplicación

### Flujo Completo

#### 1️⃣ Autenticación
```
1. Abrir http://localhost:3000
2. Registrarse o iniciar sesión
3. Ser redirigido al Dashboard
```

#### 2️⃣ Explorar Música
```
1. Ir a "Canciones"
2. Ver la lista de canciones
3. Buscar una canción específica
4. Crear una nueva canción con "Nueva"
```

#### 3️⃣ Reproducir
```
1. Hacer clic en ▶️ en cualquier canción
2. Ver el reproductor aparecer abajo
3. Controlar la reproducción
4. Ajustar volumen y progreso
```

#### 4️⃣ Gestionar Favoritos
```
1. Ir a "Favoritos"
2. Seleccionar un usuario
3. Ver sus canciones favoritas
4. Agregar o eliminar favoritos
```

#### 5️⃣ Administrar Usuarios
```
1. Ir a "Usuarios"
2. Ver lista de usuarios
3. Crear, editar o eliminar usuarios
```

---

## 🏗️ Arquitectura

### Tecnologías
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TypeScript
- **Estilos**: Tailwind CSS + Shadcn/ui
- **Componentes**: Radix UI
- **Estado**: Context API
- **Temas**: next-themes
- **Iconos**: Lucide React

### Estructura de Carpetas
```
app/
├── api/                 # API Routes
│   ├── auth/           # Login, Register, Logout
│   ├── canciones/      # CRUD Canciones
│   ├── usuarios/       # CRUD Usuarios
│   └── favoritos/      # CRUD Favoritos
├── canciones/          # Página de canciones
├── usuarios/           # Página de usuarios
├── favoritos/          # Página de favoritos
├── login/              # Página de login
├── layout.tsx          # Layout principal
└── page.tsx            # Dashboard

components/
├── auth/               # Componentes de auth
│   ├── login-form.tsx
│   └── protected-route.tsx
├── layout/             # Sidebar
├── player/             # Reproductor de audio
├── songs/              # Tabla y diálogos de canciones
├── users/              # Tabla y diálogos de usuarios
├── favorites/          # Lista de favoritos
├── dashboard/          # Estadísticas
├── ui/                 # Componentes reutilizables
└── theme-toggle.tsx    # Toggle de tema

contexts/
├── AuthContext.tsx           # Estado de autenticación
└── AudioPlayerContext.tsx    # Estado del reproductor

types/
└── index.ts            # TypeScript types
```

### Contextos Globales

#### AuthContext
```typescript
{
  user: Usuario | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email, password) => Promise<void>
  register: (name, email, password) => Promise<void>
  logout: () => void
}
```

#### AudioPlayerContext
```typescript
{
  currentSong: Cancion | null
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  playSong: (song) => void
  togglePlay: () => void
  setVolume: (volume) => void
  seekTo: (time) => void
  queue: Cancion[]
}
```

---

## 🔒 Seguridad

### ⚠️ Nota Importante
Esta es una **implementación de demostración**. Para producción necesitas:

1. ✅ Base de datos real (PostgreSQL/MongoDB)
2. ✅ Hashing de contraseñas (bcrypt)
3. ✅ JWT tokens con refresh
4. ✅ HTTPS
5. ✅ Validación en servidor
6. ✅ Rate limiting
7. ✅ CSRF protection
8. ✅ XSS protection

---

## 🎨 Personalización

### Cambiar Colores
Edita `app/globals.css` para modificar los colores del tema.

### Agregar Rutas
1. Crear página en `app/tu-ruta/page.tsx`
2. Envolver con `<ProtectedRoute>` si requiere auth
3. Agregar al sidebar en `components/layout/app-sidebar.tsx`

---

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrarse
- `POST /api/auth/logout` - Cerrar sesión

### Canciones
- `GET /api/canciones` - Listar todas
- `GET /api/canciones/:id` - Ver una
- `POST /api/canciones` - Crear
- `PUT /api/canciones/:id` - Actualizar
- `DELETE /api/canciones/:id` - Eliminar
- `GET /api/canciones/buscar?titulo=...` - Buscar

### Usuarios
- `GET /api/usuarios` - Listar todos
- `GET /api/usuarios/:id` - Ver uno
- `POST /api/usuarios` - Crear
- `PUT /api/usuarios/:id` - Actualizar
- `DELETE /api/usuarios/:id` - Eliminar

### Favoritos
- `GET /api/favoritos` - Listar todos
- `GET /api/favoritos/usuarios/:userId` - Por usuario
- `POST /api/favoritos/usuarios/:userId/favoritos/:cancionId` - Agregar
- `DELETE /api/favoritos/usuarios/:userId/favoritos/:cancionId` - Eliminar

---

## 🐛 Troubleshooting

### El reproductor no se ve
- Verifica que estés en una página protegida
- Revisa la consola del navegador

### No puedo iniciar sesión
- Primero regístrate
- Verifica que email y contraseña sean correctos
- Revisa la consola del navegador

### Las páginas no cargan
- Verifica que el servidor esté corriendo: `pnpm dev`
- Revisa el puerto 3000 esté disponible

---

## 🚀 Próximas Mejoras Sugeridas

1. **Playlists**: Crear y gestionar listas de reproducción
2. **Ratings**: Sistema de calificación de canciones
3. **Compartir**: Compartir canciones/playlists
4. **Upload**: Subir archivos de audio
5. **Lyrics**: Mostrar letras de canciones
6. **Social**: Seguir usuarios, comentarios
7. **PWA**: Convertir en Progressive Web App
8. **Notificaciones**: Push notifications
9. **Analytics**: Estadísticas de reproducción
10. **Recomendaciones**: Sugerir canciones

---

## 📄 Licencia

Este proyecto es una demostración educativa.

---

## 👨‍💻 Soporte

Para más información, consulta:
- `README.md` - Instrucciones de instalación
- `AUTHENTICATION.md` - Detalles de autenticación

---

**¡Disfruta tu aplicación de música!** 🎵
