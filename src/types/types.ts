export type CommandDto = {
  command: string
  description: string
  topicId: number
}

export type TopicDto = {
  categoryId: number
  name: string
  description: string
}

export type TopicCommandDto = {
  categoryId: number
  name: string
  description: string
  commands: {
    command: string
    description: string
  }[]
}

export type CategoryDto = {
  name: string
  description: string
}

export type CategoryTopicDto = {
  name: string
  description: string
  topics: TopicDto[]
}
