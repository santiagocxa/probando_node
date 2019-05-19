const { cursos } = require('./datos')

const opciones = {
  id_curso: {
    demand: true,
    alias: 'i'
  },
  nombre_estudiante: {
    demand: true,
    alias: 'n'
  },
  cedula: {
    demand: true,
    alias: 'c'
  }
}

let numeroDeCursos = 3
let id = 1


async function mostrarCurso(id) {
  while (id <= numeroDeCursos) {
    let detealleCurso = await obtenerCursos(id)
    console.log(detealleCurso)
    id++
  }
}


async function obtenerCursos(idClave) {
  let idCursos = idClave
  let { nombre, duracion, id, valor } = cursosDisponibles = cursos.find((cursoDisp) => cursoDisp.id == idCursos)

  async function generarMensaje() {
    const util = require('util')
    const retraso = util.promisify(setTimeout)
    let cursoGenerado = ('El curso disponible es: ' + nombre + ', con id: ' + id + ', tiene una duracion de ' + duracion + ' horas y un valor de: $' + valor)
    await retraso(2000)
    return cursoGenerado
  }

  let mensaje = await generarMensaje(cursosDisponibles)
  return mensaje
}


const fs = require('fs')

let crearArchivo = (contenidoArchivo) => {
  fs.writeFile('matricula.txt', contenidoArchivo, (err) => {
    if (err) throw (err)
    console.log('\nSe ha creado el archivo con la matricula exitosamente\n')
  })
}


const argv = require('yargs')
  .command('inscribir', 'Para inscribir el estudiante ingrese datos requeridos:', opciones)
  .argv

if (!argv.id_curso) {
  console.log('\nLista de Cursos:')
  mostrarCurso(id)
} else {
  let cursosDisponibles = cursos.find((cursoDisp) => cursoDisp.id == argv.id_curso)
  if (!cursosDisponibles) {
    console.log('\nIngrese un ID de curso valido, estos son los Cursos: ')
    mostrarCurso(id)
  } else {
    contenidoArchivo = ('El estudiante ' + argv.nombre_estudiante + '\n' + 'con cedula Nº' + argv.cedula + '\n' +
      'Se ha matriculado al curso ' + cursosDisponibles.nombre + ' que tiene una duracion de ' + cursosDisponibles.duracion + ' y un valor de ' + cursosDisponibles.valor)
    crearArchivo(contenidoArchivo)
  }
}