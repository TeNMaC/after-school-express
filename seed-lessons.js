// This is to ensure that the lessons can be only inserted to the MongoDB if their IDs are not present which also makes sure that rerunning the proccess wont reset the exsisting lessons availability.

const{ MongoClient} = require('mongodb')
    const lessons = require('./data/lessons')

    async function seedLessons(){
        const client = new MongoClient(process.env.MONGODB_URI)

        try {
            await client.connect()

            const collection = client.db('after_school').collection('lesson')
            await collection.createIndex({id: 1}, {unique: true })

            for (const lesson of lessons ){
                const document = {
                    id: lesson.id,
                    topic: lesson.subject,
                    location: lesson.location,
                    price: lesson.price,
                    space: lesson.spaces,
                    icon: lesson.icon,
                    image: lesson.image
                }
                await collection.updateOne(
                    {id: lesson.id},
                    {$setOnInsert: document},
                    {upsert: true }
                )
            }
            console.log('Lessons in MongoDB:', await collection.countDocuments())

        }
        finally {
            await client.close()
        }
    }
    seedLessons().catch(error => {
        console.error('Failed to seed lessons:', error.message)
        process.exitCode = 1 
    })
