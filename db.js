import dotenv from "dotenv";
dotenv.config();

import { MongoClient, ObjectId } from "mongodb";



function conectar() {
    return MongoClient.connect(process.env.MONGO_URL)
}





export function crearTarea(tarea) {
    return new Promise(async (ok, ko) => {

        let conexion = null;
        try {

            conexion = await conectar();
            let coleccion = conexion.db("tareas").collection("tareas");

            let { insertedId } = await coleccion.insertOne({ tarea, estado: false });



            ok(insertedId);

        } catch (error) {

            ko({ error: "error bbdd" });
        } finally {
            conexion.close();
        }
    });
}

/*crearTarea({ tarea: "constuir API solo", estado: false })
    .then(x => console.log(x))
    .catch(x => console.log(x));*/


export function leerTareas() {
    return new Promise(async (ok, ko) => {

        let conexion = null;
        try {

            conexion = await conectar();
            console.log(conexion)
            let coleccion = conexion.db("tareas").collection("tareas");
            let tareas = await coleccion.find({}).toArray();



            tareas = tareas.map(({ _id, tarea, estado }) => {
                return { id: _id, tarea, estado }
            });

            ok(tareas);

        } catch (error) {

            ko({ error: "error bbdd" });
        } finally {

            conexion.close();
        }
    });
}

/*leerTareas("terminar la API")
    .then(x => console.log(x));*/

export function borrarTarea(id) {
    return new Promise(async (ok, ko) => {

        let conexion = null;
        try {

            conexion = await conectar();
            let coleccion = conexion.db("tareas").collection("tareas");

            coleccion.deleteOne({ id: new ObjectId(id) })


            let { deletedCount } = await coleccion.deleteOne({ _id: new ObjectId(id) })



            ok(deletedCount);

        } catch (error) {

            ko({ error: "error bbdd" });
        } finally {
            conexion.close();
        }
    });
}



/*borrarTarea('6750538ee4f4896bc7da0a63')
    .then(x => console.log(x))
    .catch(x => console.log(x));*/


export function editarTarea(id, texto) {
    return new Promise(async (ok, ko) => {
        let conexion = null;
        try {
            conexion = await conectar();
            let coleccion = conexion.db("tareas").collection("tareas");

            let { modifiedCount } = await coleccion.updateOne({ _id: new ObjectId(id) }, { $set: { tarea: texto } });



            ok(modifiedCount);

        } catch (error) {

            ko({ error: "error bbdd" });
        } finally {
            conexion.close();
        }
    });
}

/*editarTarea('6750538ee4f4896bc7da0a63', "bla bla")
    .then(x => console.log(x))
    .catch(x => console.log(x));*/


export function editarEstado(id) {
    return new Promise(async (ok, ko) => {
        let conexion = null;
        try {
            conexion = await conectar();
            let coleccion = conexion.db("tareas").collection("tareas");

            let { estado } = await coleccion.findOne({ _id: new ObjectId(id) });
            console.log(estado);

            let { modifiedCount } = await coleccion.updateOne({ _id: new ObjectId(id) }, { $set: { estado: !estado } });



            ok(modifiedCount);

        } catch (error) {

            ko({ error: "error bbdd" });
        } finally {
            conexion.close();
        }
    });
}

/*editarEstado('6750490ea2cc503d2dce3c74')
    .then(x => console.log(x))
    .catch(x => console.log(x));*/


