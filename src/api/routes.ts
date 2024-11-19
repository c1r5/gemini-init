import GeminiAPIService from '../services/gemini-api-service';


enum Topics {
    WEATHER = "WEATHER",
    DATETIME = "DATETIME"
}

type PromptSetup = {
    language: string,
    prompt: string,
    data? : ""
}

const geminiApiService = new GeminiAPIService();
const DEFAULT_LANGUAGE = "Português Brasileiro";
const DEFAULT_TOPICS = [Topics.WEATHER, Topics.DATETIME];

const generate_base_prompt = (setup: PromptSetup) => {
    if (setup.data === undefined) throw new Error("Data is required")
    return `In ${setup.language} language,` 
    + `respond the prompts respectively: '${setup.prompt}'` 
    + " " + (setup.data ? `using whole these data if not necessary ignore them: '${setup.data}'` : "")
    + " dont repeat the prompts, only answer."
}

async function detectTopics(prompt: string): Promise<Topics[]> {
    const promptSetup: PromptSetup = {
        language: DEFAULT_LANGUAGE,
        prompt: `Classify the following sentence: '${prompt}' into these topics ${DEFAULT_TOPICS.join(", ")}.`
    }

    const result = (await geminiApiService.run(promptSetup.prompt))
    result.onError(error => {
        console.log("Error at detecting topics:", error)
    })

    return DEFAULT_TOPICS.filter(topic => result.success?.includes(topic));
}



function formatDateTimeAsNaturalLanguage(date: Date): string {
    let day = date.getDay()
    let dateOfMonth = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getMinutes()

    return `${dayOfWeek(day)}, ${dateOfMonth} of ${monthOfYear(month)}, ${year} at ${hour}:${minute}`

}

function monthOfYear(month: number): string {
    switch(month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "Invalid month";
    }
    
}

function dayOfWeek(day: number): string {
    switch (day) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        default:
            return "Invalid day"
    }
}

export default class AIRoute {

    static async handler(req: any, res: any) {
        const prompt = req.params.prompt
        const promptSetup: PromptSetup = {
            language: DEFAULT_LANGUAGE,
            prompt: prompt,
            data: ""
        }


        const detectedTopics = await detectTopics(prompt)

        for (const topic of detectedTopics) {
            switch (topic) {
                case Topics.DATETIME:
                    promptSetup.data += promptSetup.data.concat(
                        formatDateTimeAsNaturalLanguage(
                            new Date(Date.now())
                        )
                    )
                    break
                case Topics.WEATHER:
                    break
                default:
                    break
            }
        }

        const generated_prompt = generate_base_prompt(promptSetup)
     
        const ai_result = await geminiApiService.run(generated_prompt)

        ai_result.onSuccess(generated_answer => {
            res.status(200).send({
                message: generated_answer
            })
        }).onError(error => {
            res.status(500).send({
                message: error
            })
        })

    }
}
