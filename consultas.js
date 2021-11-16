/*Este mes estan haciendo reformas en la parte de paritorios, y van a inhabilitar
cierto espacio de este temporalmente,por ello queremos saber cuantas mujeres estan embarazadas*/
 
db.pacientes.find(
    {
   embarazada: {$exists:true}
     } ).count()


   
   /*Nuestra medica Maria Esperanza tiene una baja que le cumbre todo este mes de diciembre,
   por ello necesitamos la lista de pacientes que tienen una revision pendiente con ella en diciembre,
   para poder cambiarle la cita*/
   
    db.pacientes.find(
        {
                 $and: [
                {revision:{$gte:new Date("2021-12-01")}},
                {revision:{$lte:new Date("2021-12-31")}},
                 {medico:"Maria Esperanza"}]})




/*Ha salido una nueva vacuna y tenemos que ponerla a los jovenes y ancianos primero ya que son los mas
vulnerables*/

db.pacientes.find(
    {
       $or:[
           {edad:{$lte:25}},
           {edad:{$gte:65}}
       ]
    }
    )
    /*hemos contratado a nuevos medicos, y quieren tener una lista de los pacientes los
    cuales no estan sanos para tenerlos controlados*/

    db.pacientes.find( {
        $and: [
            { estado : { $not: { $eq:"leve" } } },
        {enfermedades:{$all:["cancer,epoc"]}}]} )

    db.pacientes.find( {$and:[{ estado : { $ne:"sano" }}, 
    {enfermedades:{$all:["cancer,epoc"]}}]} )
   
    /*Nuestras neveras en las que teniamos toda la sangre de tipo positivo, se han averiado
    y estamos haciendo una campaña para los donantes de sangre positiva, para ello
    queremos tener la lista de nuestros pacientes con sangre positiva para saber si pueden donar que esten sano */
   

    db.pacientes.find( 
        {$and:[
     {sangre:{$regex:/.+/ }},
    {estado:"sano"}]})
   


    /* Necesitamos operar todas las personas que tienen una intervencion pendiente, y su
    salud no esta sana   */

    db.pacientes.find({ $nor: [ { estado:"sano" },
    { intervencionespendientes:false } ]  } )

   
    
 
    /*Necesitamos saber que pacientes se han puesto vacunas y no estan sanos y no tenags intervenciones pendientes*/
    

    db.pacientes.find({
        $and: [ { vacunascovid: { $in: [ 1,2 ] } },
                  {estado:{$ne:"sano"} },
                  { intervencionespendientes:false }]})

                  db.pacientes.find({
                    $and: [ { vacunascovid: { $in: [ 1,2 ] } },
                    {estado: { $not: { $eq:"sano" } }},
                     { intervencionespendientes:false }]}) 
    /*Queremos ver cuantas personas de mucha edad estan graves y no sean mujer para apartarlas a otra sala*/
   


    db.pacientes.find(
        {
     $and: [
         {edad:{$gte:55}},
        {estado:"grave"},
       {estado: { $not: { $eq:"mujer" }}}
     ]})

       
/*Nos hemos equivacado poniendo el nombre de una pacienta, en vez de Mariangeles se llama Josefa*/
db.pacientes.update({ nombre: "Mariangeles" },
{$rename: { 'Mariangeles': 'Josefa' } })

                       
                       

