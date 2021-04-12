import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await prisma.command.deleteMany({})
  await prisma.topic.deleteMany({})
  await prisma.category.deleteMany({})

  const DevOpsCategory = await prisma.category.create({
    data: {
      name: 'DevOps',
      description:
        'DevOps is a set of practices that combines software development and IT operations.' +
        'It aims to shorten the systems development life cycle and provide continuous delivery' +
        'with high software quality. DevOps is complementary with Agile software development;' +
        'several DevOps aspects came from Agile methodology.'
    }
  })
  const DockerTopic = await prisma.topic.create({
    data: {
      name: 'Docker',
      description:
        'Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called ' +
        'containers. Containers are isolated from one another and bundle their own software, libraries and configuration files;' +
        'they can communicate with each other through well-defined channels.',
      category: {
        connect: {
          id: DevOpsCategory.id
        }
      }
    }
  })

  const DockerCommand = await prisma.command.create({
    data: {
      Topic: {
        connect: {
          id: DockerTopic.id
        }
      },
      command: 'docker container ls',
      description: 'Shows all the running containers'
    }
  })
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect()
  })
