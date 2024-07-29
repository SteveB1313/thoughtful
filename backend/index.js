const express = require('express')
const cors = require('cors')
const { Sequelize, Model, DataTypes } = require('sequelize');
const app = express()
app.use(cors())
app.use(express.json())
const port = 8080

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

class Reminder extends Model {}
Reminder.init({
    id: { type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    occurance: DataTypes.STRING
}, {sequelize, modelName: 'reminder'});

sequelize.sync();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/reminder-api/all', async(req,res) => {
    const reminders = await Reminder.findAll();
    res.json(reminders);
})

app.get('/reminder-api/:id', async(req, res) => {
    const reminder = await Reminder.findByPk(req.params.id);
    res.json(reminder);
})

app.post('/reminder-api/create', async (req, res) => {
    const title = req.body.title
    const occurance = req.body.occurance
    const reminder = await Reminder.create(req.body);
    console.log(`request: ${title} - ${occurance}`)
    res.json(reminder);
})

app.put('/reminder-api/:id', async(req,res) => {
    const reminder = await Reminder.findByPk(req.params.id);
    if(reminder) {
        await reminder.update(req.body);
        res.json(reminder);
    } else {
        res.status(404).json({message: 'Reminder not found'});
    }
})

app.delete('/reminder-api/:id', async(req,res) => {
    const reminder = await Reminder.findByPk(req.params.id);
    if(reminder) {
        await reminder.destroy();
        res.json({ message: 'Reminder delete' });
    } else {
        res.status(404).json({ message: 'Reminder not found'});
    }
})

app.listen(port, () => {
    console.log(`Thoughful backend running on port ${port}`);
})