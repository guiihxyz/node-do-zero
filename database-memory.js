import { randomUUID } from 'crypto'

export class DatabaseMemory {
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries()).map((video_array) => {
            const id = video_array[0]
            const data = video_array[1]
            
            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if(search) {
                return video.title.includes(search)
            }
            return true
        })
    }

    create(video) {
        const video_id = randomUUID()
        this.#videos.set(video_id, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}