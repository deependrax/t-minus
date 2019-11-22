'use strict'

const {expect, assert} = require('chai')
const {describe, it} = require('mocha')
const countdown = require('../index')
const logFormatter = require('../log-formatter')

describe('Log formatter', function () {
  it('Brighter log', function () {
    expect(logFormatter.bright).to.equal('\x1b[1m')
  })
  it('Red background', function () {
    expect(logFormatter.bg.red).to.equal('\x1b[41m')
  })
  it('White font color', function () {
    expect(logFormatter.fg.white).to.equal('\x1b[37m')
  })
  it('Reset Formatter', function () {
    expect(logFormatter.reset).to.equal('\x1b[0m')
  })
})

describe('T-Minus logger', function () {
  it('Countdown for 2 seconds', function () {
    const t = (new Date()).getTime()
    const configuredTime = 2
    return countdown('Launching', configuredTime).then(() => {
      const delay = (new Date()).getTime() - t
      assert.isAtLeast(delay, configuredTime * 1000, 'Delay should be atleast for configured time')
      assert.isAtMost(delay, configuredTime * 1000 + 100, 'Delay should be at most 100ms more than configured time')
    })
  }).timeout(3000)
  it('Default countdown', function () {
    const t = (new Date()).getTime()
    const defaultTime = 5
    return countdown().then(() => {
      const delay = (new Date()).getTime() - t
      assert.isAtLeast(delay, defaultTime * 1000, 'Delay should be atleast for configured time')
      assert.isAtMost(delay, defaultTime * 1000 + 100, 'Delay should be at most 200ms more than configured time')
    })
  }).timeout(6000)
  it('No Countdown', function () {
    return countdown({}, 0).then(() => {
      assert.fail()
    }).catch(err => {
      expect(err.message).to.equal('Countdown Error, please refer documentation for valid message & initial counter (T) values')
    })
  })
})
