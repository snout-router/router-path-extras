import {path} from '@snout/router-path'

import {int} from '../../src/coercion'

describe('int()', () => {
  it('should allow building from a number', () => {
    const subject = path`/a/${int('p1')}/b`

    expect(subject.build({p1: 111})).toBe('/a/111/b')
    expect(subject.build({p1: 111.11})).toBe('/a/111/b')
  })

  it('should match integer strings', () => {
    const subject = path`/a/${int('p1')}/b`

    expect(subject.match('/a/0/b')).toStrictEqual({p1: 0})
    expect(subject.match('/a/1/b')).toStrictEqual({p1: 1})
    expect(subject.match('/a/10/b')).toStrictEqual({p1: 10})
    expect(subject.match('/a/1234567890/b')).toStrictEqual({p1: 1234567890})
  })

  it('should not match leading zeros', () => {
    expect(path`/a/${int('p1')}/b`.match('/a/0111/b')).toBeUndefined()
  })

  it('should not match exponential notation', () => {
    expect(path`/a/${int('p1')}/b`.match('/a/1e0/b')).toBeUndefined()
  })
})
