# SISTEMA DE GESTIÓN DE CITAS MÉDICAS PARA CONSULTORIO ODONTOARIAS
App móvil para consultorio odontologico

## Proyecto alojado en play store
![Imagen de WhatsApp 2023-09-03 a las 18 25 12](https://github.com/mayP2201/ConsultorioOdont/assets/128390603/fcbf987d-a95a-4fa1-9c54-2860b8b88f01)


## Enlace para el Manual de usuario


## Manual de instalacion
Para instalar localmente el proyecto se debe de seguir los siguientes pasos:

Descargar el comprimido ZIP
[Desacargar ZIP](https://github.com/Lesly-liseth/Odontoarias/archive/refs/heads/master.zip)

Instalar las dependencias con el siguiente comando:
```bash
composer install
```

Copiar el contenido del archivo ".env.example" en un archivo nuevo llamado ".env".
```bash
cp .env.example .env 
```

Generar una clave única de aplicación para el archivo de configuración
```bash
php artisan key:generate 
```

## Iniciar el proyecto
Para que el presente proyecto se inicio se debe ejecutar el siguiente comando:
```bash
php artisan serve 
```

## Autores
- Frontend [**Lesly Herrera**](https://github.com/Lesly-liseth) [Frontend](https://github.com/Lesly-liseth/Odontoarias.git)
- Backend [**Jhon Torres**](https://github.com/jhon-torres) [Backend](https://github.com/jhon-torres/EndPoints_CO.git)
- App Móvil [**Mayra Ñaupari**](https://github.com/mayP2201) [App Móvil](https://github.com/mayP2201/ConsultorioOdont.git)
