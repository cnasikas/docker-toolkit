const express = require('express')

const docker = require('../../docker')({ host: process.env.DOCKER_HOST })
const { HTTPError } = require('../errors')

const router = express.Router()

const routeWrapper = async (next, cb) => {
  try {
    await cb()
  } catch (err) {
    if (err.statusCode) {
      return next(new HTTPError(err.statusCode, err.message))
    }

    return next(err)
  }
}

router.get('/', async (req, res, next) => {
  routeWrapper(next, async () => {
    const containers = await docker.listContainers()
    return res.status(200).json(containers)
  })
})

router.post('/create', async (req, res, next) => {
  routeWrapper(next, async () => {
    const imageFound = await docker.imageExists(req.body.image)
    if (!imageFound) {
      await docker.pullImage({ fromImage: req.body.image, tag: 'latest' })
    }

    await docker.createContainer({ image: req.body.image })
    return res.status(200).json({})
  })
})

router.post('/:id/start', async (req, res, next) => {
  routeWrapper(next, async () => {
    await docker.startContainer(req.params.id)
    return res.status(204).json({})
  })
})

router.post('/:id/stop', async (req, res, next) => {
  routeWrapper(next, async () => {
    await docker.stopContainer(req.params.id)
    return res.status(204).json({})
  })
})

router.delete('/:id', async (req, res, next) => {
  routeWrapper(next, async () => {
    await docker.deleteContainer(req.params.id)
    return res.status(204).json({})
  })
})

module.exports = router
