// _mock
import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

export const JWT_SECRET = 'minimal-secret-key';

export const JWT_EXPIRES_IN = '3 days';

export const _users = [
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    password: 'demo1234',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  },
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-1',
    displayName: 'David Castellanos Zayas',
    email: 'david383812@gmail.com',
    password: 'Dacaza4083*',
    photoURL: _mock.image.avatar(23),
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  },
];
