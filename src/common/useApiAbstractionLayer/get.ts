import topics from './topics/index.json'
import email from './topics/email.json'
import customerService from './topics/customerService.json'
import projectManagement from './topics/projectManagement.json'

const topicResults = {
  customerService,
  email,
  projectManagement,
} as unknown as Array<Record<string, string|number>>

const get = (
  endpoint: string,
  body?: Record<string, string|number>,
) => {
  if( body?.id ){
    // eslint-disable-next-line no-console
    console.log( `fetching data from /${ endpoint }/${ body.id }` )
    return topicResults[body.id as keyof typeof topicResults]
  }
  // eslint-disable-next-line no-console
  console.log( `fetching data from /${ endpoint }` )
  return topics
}

export default get