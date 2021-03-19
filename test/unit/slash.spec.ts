import {path} from '@packula/router-path'

import {createSlash, slash} from '../../src/slash'

describe('createSlash()', () => {
  it('should allow building with a boolean indicating whether to include the slash', () => {
    const subject = path`/a/${'p1'}${createSlash('p2')}`

    expect(subject.build({p1: 'x', p2: true})).toBe('/a/x/')
    expect(subject.build({p1: 'x', p2: false})).toBe('/a/x')
  })

  it('should match optional trailing slashes', () => {
    const subject = path`/a/${'p1'}${createSlash('p2')}`

    expect(subject.match('/a/x/')).toStrictEqual({p1: 'x', p2: true})
    expect(subject.match('/a/x')).toStrictEqual({p1: 'x', p2: false})
  })

  it('should match optional non-trailing slashes', () => {
    const subject = path`/a${createSlash('p1')}${'p2'}`

    expect(subject.match('/a/x')).toStrictEqual({p1: true, p2: 'x'})
    expect(subject.match('/ax')).toStrictEqual({p1: false, p2: 'x'})
  })
})

describe('slash', () => {
  it('should allow building with a boolean indicating whether to include the slash', () => {
    const subject = path`/a/${'p1'}${slash}`

    expect(subject.build({p1: 'x', hasSlash: true})).toBe('/a/x/')
    expect(subject.build({p1: 'x', hasSlash: false})).toBe('/a/x')
  })

  it('should match optional trailing slashes', () => {
    const subject = path`/a/${'p1'}${slash}`

    expect(subject.match('/a/x/')).toStrictEqual({p1: 'x', hasSlash: true})
    expect(subject.match('/a/x')).toStrictEqual({p1: 'x', hasSlash: false})
  })

  it('should match optional non-trailing slashes', () => {
    const subject = path`/a${slash}${'p1'}`

    expect(subject.match('/a/x')).toStrictEqual({hasSlash: true, p1: 'x'})
    expect(subject.match('/ax')).toStrictEqual({hasSlash: false, p1: 'x'})
  })
})
