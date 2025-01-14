const serviceEdge = require('./service/edges')
const serviceNode = require('./service/nodes')
const serviceViewPoint = require('./service/viewPoint')

const getNodeInfo = (id, x, y) => {
  return {
    id,
    position: { x, y }
  }
}

const load = async () => {
  console.log('adding nodes - start')
  await serviceNode.addNode({
    data: { label: 'Arch Buddy' },
    type: 'system'
  })
  await serviceNode.addNode({
    data: { label: 'Microsoft Identity' },
    type: 'system'
  })
  await serviceNode.addNode({
    data: { label: 'Google Authenticator' },
    type: 'system'
  })
  console.log('adding nodes - end')
  console.log('adding edges - start')
  await serviceEdge.addEdge({ source: 'n1', sourceHandle: 'r1', target: 'n2', targetHandle: 'l1', label: 'authenticate' })
  await serviceEdge.addEdge({ source: 'n1', sourceHandle: 'r1', target: 'n3', targetHandle: 'l1', label: 'authenticate' })
  await serviceEdge.addEdge({ id: 'n1n3-1', source: 'n1', sourceHandle: 'r1', target: 'n3', targetHandle: 'l1', label: 'user' })
  console.log('adding edges - end')

  console.log('adding view points - start')
  await serviceViewPoint.create('view point 1')
  await serviceViewPoint.associate({ id: 1, name: 'view point 1', nodes: [getNodeInfo('n1', -30, 10), getNodeInfo('n2', 99, -59)], edges: ['n1n2'] })
  await serviceViewPoint.create('view point 2')
  await serviceViewPoint.associate({ id: 2, name: 'view point 2', nodes: [getNodeInfo('n1', -30, 10), getNodeInfo('n3', 91, 54)], edges: ['n1n3'] })
  await serviceViewPoint.create('view point 3')
  await serviceViewPoint.associate({ id: 3, name: 'view point 3', nodes: [getNodeInfo('n1', -30, 10), getNodeInfo('n3', 91, 54)], edges: ['n1n3', 'n1n3-1'] })
  await serviceViewPoint.create('view point 4')
  await serviceViewPoint.associate({ id: 4, name: 'view point 4', nodes: [getNodeInfo('n1', -30, 10), getNodeInfo('n2', 99, -59), getNodeInfo('n3', 91, 54)], edges: ['n1n3', 'n1n3-1', 'n1n2'] })
  console.log('adding view points - end')
}

module.exports = {
  load
}
