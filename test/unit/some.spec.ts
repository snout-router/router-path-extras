import {path} from '@snout/router-path'

import {some} from '../../src/repeating'

describe('some()', () => {
  it('should allow building from an array', () => {
    const subject = path`/a${some('p1')}/b`

    expect(subject.build({p1: ['wx', 'yz']})).toBe('/a/wx/yz/b')
    expect(subject.build({p1: ['xy']})).toBe('/a/xy/b')
  })

  it('should allow building with alternate expressions, separators, and prefixes', () => {
    expect(path`/a${some('p1', /x/, '<sep>')}/b`.build({p1: ['wx', 'yz']})).toBe('/a<sep>wx<sep>yz/b')
    expect(path`/a${some('p1', /x/, '<sep>', '<pre>')}/b`.build({p1: ['wx', 'yz']})).toBe('/a<pre>wx<sep>yz/b')
  })

  it('should match one to many path segments', () => {
    const subject = path`/a${some('p1')}/b`

    expect(subject.match('/a/b')).toBeUndefined()
    expect(subject.match('/a/xy/b')).toStrictEqual({p1: ['xy']})
    expect(subject.match('/a/wx/yz/b')).toStrictEqual({p1: ['wx', 'yz']})
  })

  it('should allow matching with alternate expressions, separators, and prefixes', () => {
    const subjectA = path`/a${some('p1', /xy|yz|[𝓍𝓎]/u, '<sep>')}/b`

    expect(subjectA.match('/a/b')).toBeUndefined()
    expect(subjectA.match('/a<sep>xy/b')).toStrictEqual({p1: ['xy']})
    expect(subjectA.match('/a<sep>xy<sep>yz<sep>𝓍<sep>𝓎/b')).toStrictEqual({p1: ['xy', 'yz', '𝓍', '𝓎']})

    const subjectB = path`/a${some('p1', /xy|yz|[𝓍𝓎]/u, '<sep>', '<pre>')}/b`

    expect(subjectB.match('/a/b')).toBeUndefined()
    expect(subjectB.match('/a<pre>xy/b')).toStrictEqual({p1: ['xy']})
    expect(subjectB.match('/a<pre>xy<sep>yz<sep>𝓍<sep>𝓎/b')).toStrictEqual({p1: ['xy', 'yz', '𝓍', '𝓎']})
  })

  it('should not match empty path segments', () => {
    const subject = path`/a${some('p1')}/b`

    expect(subject.match('/a//b')).toBeUndefined()
    expect(subject.match('/a///b')).toBeUndefined()
  })

  it('should complain about keys being possibly undefined', () => {
    const result = path`/a${some('p1')}/b`.match('/a/wx/yz/b')

    expect(result).toBeDefined()
    if (result == null) return // TypeScript guard

    expect(result.p1[0].toUpperCase()).toBe('WX')
    // @ts-expect-error
    expect(result.p1[1].toUpperCase()).toBe('YZ')
  })
})
