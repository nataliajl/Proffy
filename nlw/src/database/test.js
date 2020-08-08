const Database = require('./db.js')
const createProffy = require('./createProffy.js')

Database.then(async (db) => {
    //Inserir dados
    proffyValue = { 
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "1197893706",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões." 
    }

    classValue = {
        subject: 1, 
        cost: "20,00", 
        // proffy id
    }

    classScheduleValues = [
        {
            weekday: [0], 
            time_from: [720], 
            time_to: [1220]
        },
        {
            weekday: [1], 
            time_from: [520], 
            time_to: [1320]
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // consultar dados inseridos

    const selectedProffys = await db.all("SELECT * FROM proffys")

    
    // consultar classes de x proffy
    const selectedClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.* FROM proffys JOIN classes 
    ON (classes.proffy_id = proffys.id) WHERE classes.proffy_id = 1;
    `)
    
    // busca professores a partir de x horario até y, com dia e matéria fixa
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.* FROM class_schedule 
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "1320"
        AND class_schedule.time_to > "520"
        `) 
    console.log(selectedClassesSchedules)
})