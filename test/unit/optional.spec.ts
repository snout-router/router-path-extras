import {param, path} from '@packula/router-path'

import {int} from '../../src/coercion'
import {optional} from '../../src/optional'

describe('optional()', () => {
  it('should allow building with or without a defined arg', () => {
    const subject = path`/a/${'p1'}${optional`/b/${param('p2')}/c`}/d`

    expect(subject.build({p1: 'x', p2: 'y'})).toBe('/a/x/b/y/c/d')
    expect(subject.build({p1: 'x', p2: undefined})).toBe('/a/x/d')
    expect(subject.build({p1: 'x'})).toBe('/a/x/d')
  })

  it('should allow building when the inner param is specified as a string', () => {
    const subject = path`/a/${'p1'}${optional`/b/${'p2'}/c`}/d`

    expect(subject.build({p1: 'x', p2: 'y'})).toBe('/a/x/b/y/c/d')
    expect(subject.build({p1: 'x', p2: undefined})).toBe('/a/x/d')
    expect(subject.build({p1: 'x'})).toBe('/a/x/d')
  })

  it('should match with or without the optional section', () => {
    const subject = path`/a/${'p1'}${optional`/b/${param('p2')}/c`}/d`

    expect(subject.match('/a/x/b/y/c/d')).toStrictEqual({p1: 'x', p2: 'y'})
    expect(subject.match('/a/x/d')).toStrictEqual({p1: 'x', p2: undefined})
    expect(subject.match('/a/x')).toBeUndefined()
  })

  it('should complain about invalid inner param counts', () => {
    // @ts-expect-error
    expect(() => optional`/a`).toThrow('Invalid param count')
    // @ts-expect-error
    expect(() => optional`/a/${'p1'}/b/${'p2'}`).toThrow('Invalid param count')
  })

  it('should respect the types of the inner param', () => {
    const subject = path`/a/${optional`${int('p1')}`}`

    expect(subject.build({p1: 111})).toBe('/a/111')
    expect(subject.match('/a/111')).toStrictEqual({p1: 111})

    // @ts-expect-error
    expect(subject.build({p1: '111'})).toBe('/a/111')
  })
})
