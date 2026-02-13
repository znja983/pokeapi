# Guía para Agregar Imágenes - Trench Crusade Wiki

## 📁 Estructura de Carpetas

Las imágenes deben colocarse en la carpeta:
```
/images/
  ├── sacerdote.jpg      (Sacerdote Flagelante)
  ├── templario.jpg      (Caballero Templario)
  ├── demonio.jpg        (Demonio Menor)
  ├── principe.jpg       (Príncipe Infernal)
  ├── inquisidor.jpg     (Inquisidor Cazador)
  ├── cruzado.jpg        (Cruzado de Trinchera)
  ├── bruja.jpg          (Bruja Hereje)
  ├── bestia.jpg         (Bestia Infernal)
  ├── tecnico.jpg        (Técnico Antioquiano)
  ├── asesino.jpg        (Asesino Maldito)
  ├── poseido.jpg        (Hereje Poseído)
  └── profeta.jpg        (El Profeta Caído)
```

## 📸 Especificaciones de Imágenes

### Recomendado:
- **Formato**: JPG o PNG
- **Tamaño**: Mínimo 200x200px, Máximo 800x800px
- **Relación de aspecto**: Cuadrada (1:1) o retrato (3:4)
- **Peso**: Menos de 500KB por imagen
- **Estilo**: Grimdark, oscuro, horror religioso medieval

## 🎨 Cómo Agregar Imágenes

### Opción 1: Cargar desde tu PC
1. Copia las imágenes a la carpeta `images/`
2. Renómbralas según los nombres especificados arriba
3. Las imágenes se cargarán automáticamente

### Opción 2: Cambiar Nombres de Imágenes
Si deseas usar otros nombres, edita el archivo `JS/datos.js`:

```javascript
const baseDatosTrench = [
  { 
    id: 1, 
    name: "Sacerdote Flagelante", 
    faction: "Peregrinos de la Trinchera", 
    description: "...",
    image: "images/mi-imagen-personalizada.jpg"  // ← Cambiar aquí
  },
  // ...
];
```

## 🖼️ Dónde se Muestran las Imágenes

1. **Listado de Personajes** (Personajes):
   - Imágenes pequeñas de 80x80px
   - Se muestran en una grilla

2. **Página de Detalle** (Al hacer click):
   - Imagen grande de hasta 300px de ancho
   - Se muestra en la parte superior

3. **Galería de Unidades** (Unidades):
   - Imágenes de 40x40px a 60x60px
   - Se muestran en una galería de colección

## ✅ Si una Imagen no Carga

El sistema muestra un emoticón de espada (⚔️) automáticamente si:
- El archivo no existe
- La ruta es inválida
- Hay problemas con el servidor

## 💡 Ejemplo: Cargar desde URL Externa

Si prefieres usar URLs externas en lugar de archivos locales:

```javascript
image: "https://example.com/sacerdote-dark.jpg"
```

## 🎭 Idea de Personajes para Trench Crusade

- **Sacerdote Flagelante**: Clérigo oscuro, quizás con sangre, cicatrices
- **Caballero Templario**: Guerrero medieval blindado, gótico
- **Demonio Menor**: Criatura infernal, roja/oscura
- **Príncipe Infernal**: Señor demoníaco, majestuoso y aterrador
- **Inquisidor**: Cazador de herejes, severo
- **Cruzado**: Soldado rastrojo, Primera Guerra Mundial gótica
- **Bruja Hereje**: Hechicera maldita, corrupta
- **Bestia Infernal**: Abominación, múltiples extremidades
- **Técnico**: Ingeniero con tecnología modificada
- **Asesino Maldito**: Sicario envenenado, siniestro
- **Hereje Poseído**: Humano corrompido, horrible
- **Profeta Caído**: Visionario maldito, profético

## 📝 Checklist

- [ ] Crear/llenar carpeta `images/`
- [ ] Agregar imágenes JPG o PNG
- [ ] Nombrar archivos correctamente
- [ ] Verificar que las imágenes se cargan
- [ ] Ajustar rutas en `datos.js` si es necesario

¡Listo! Tu wiki de Trench Crusade ya está lista para imágenes grimdark.

