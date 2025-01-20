export const authRoles = {
    // sa: ['SA'], // Only Super Admin has access
    // admin: ['SA', 'ADMIN'],
    // editor: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
    // guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
    admin:['ADMIN'],  // Only  Admin has access
       patient:['PATIENT'],  // Only USER & Admin has access
       doctor:[ 'DOCTOR' ]


}