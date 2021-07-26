const fs = require('fs').promises

class Archivo {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    async leer() {
        try {
            const data = JSON.parse(await fs.readFile(this.nombreArchivo, 'utf-8'))
            console.log(data)
            return data
        }
        catch (err) {
            console.log('Ocurrió un error:', err)
            return []
        }
    }

    async guardar(titulo, precio, miniatura) {
        try {
            const data = JSON.parse(await fs.readFile(this.nombreArchivo, 'utf-8'))
            const proximaLinea = {
                title: titulo,
                price: precio,
                thumbnail: miniatura,
                id: data.length + 1
            }
            data.push(proximaLinea)
            await fs.writeFile(this.nombreArchivo, JSON.stringify(data, null, '\t'), 'utf-8')
            console.log('Escrita:', proximaLinea)
        }
        catch (err) {
            console.log('Ocurrió un error:', err)
        }
    }

    async borrar() {
        try {
            fs.unlink(this.nombreArchivo)
        }
        catch (err) {
            console.log('Ocurrió un error:', err)
        }
    }
}

const main = async () => {
    await fs.copyFile('productos.txt', 'productos.txt.bkp') // Hago un respaldo del archivo
    const archivo = new Archivo('productos.txt')
    await archivo.leer()
    await archivo.guardar("Pescado", 530, "www.unadireccion.com/pescado.png")
    await fs.copyFile('productos.txt', 'modificado.txt') // Dejo un registro de la modificacion
    await archivo.borrar()
    await fs.rename('productos.txt.bkp', 'productos.txt') // Recupero el original
}

main()