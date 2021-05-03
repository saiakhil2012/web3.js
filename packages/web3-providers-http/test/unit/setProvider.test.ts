import {ProviderOptions} from 'web3-providers-base/types'

import Web3ProvidersHttp from '../../src/index'

describe('Web3ProvidersHttp.setProvider', () => {
    const updatedProviderString = 'http://foo.bar'

    let providerOptions: ProviderOptions

    beforeEach(() => {
        providerOptions = {
            providerString: 'http://127.0.0.1:8545',
            protectProvider: false,
            supportsSubscriptions: false
        }
    })

    it('should update the provider with updatedProviderString', () => {
        const web3ProvidersHttp = new Web3ProvidersHttp(providerOptions)
        expect(web3ProvidersHttp).toMatchObject(providerOptions) // Sanity
        web3ProvidersHttp.setProvider(updatedProviderString)
    })

    it('should error because provider is protected', () => {
        providerOptions.protectProvider = true

        const web3ProvidersHttp = new Web3ProvidersHttp(providerOptions)
        expect(web3ProvidersHttp).toMatchObject(providerOptions) // Sanity
        expect(() => {
            web3ProvidersHttp.setProvider(updatedProviderString)
        }).toThrowError('Failed to set provider: Provider is protected')
    })

    it('should error because provider string is invalid', () => {
        const web3ProvidersHttp = new Web3ProvidersHttp(providerOptions)
        expect(web3ProvidersHttp).toMatchObject(providerOptions) // Sanity
        expect(() => {
            web3ProvidersHttp.setProvider('foobar')
        }).toThrowError('Failed to set provider: Failed to create HTTP client: Invalid HTTP(S) URI provided')
    })
})
