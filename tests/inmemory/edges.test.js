const srv = require('../../src/repository/db')
const dummy = require('../../src/dummy')

beforeAll(async () => {
  await dummy.load()
})

test('edges', async function () {
  const edges = await srv.getEdges()
  expect(edges.length > 0).toBe(true)
})

test('add edge', async function () {
  const edge = {
    source: 'n2',
    target: 'n3',
    sourceHandle: 'r1',
    targetHandle: 'l1',
    label: 'test'
  }
  expect((await srv.getEdges()).length).toBe(3)
  await srv.addEdge(edge)
  const edges = await srv.getEdges()
  expect(edges.length).toBe(4)
})

test('delete edge', async function () {
  expect((await srv.getEdges()).length).toBe(4)
  await srv.deleteEdge('n2n3')
  expect((await srv.getEdges()).length).toBe(3)
})

test('patch edge', async function () {
  const edges = await srv.getEdges()
  expect(edges[0].label).toBe('authenticate')

  await srv.patchEdge({ id: edges[0].id, label: 'teste' })

  const edgesNovo = await srv.getEdges()
  expect(edgesNovo[0].label).toBe('teste')
})

test('exists', async function () {
  let edge = await srv.getEdge('n1n2')
  expect(edge).not.toBe(undefined)
  edge = await srv.getEdge('1')
  expect(edge).toBe(undefined)
})

test('filter', async function () {
  const list = await srv.filterEdges(['n1n2'])
  expect(list.length).toBe(1)
})
