//////////////////
/// ERRORS
/////////////////
module prixel_cred::errors;

const E_NOT_OWNER: u64 = 0;
const E_FORBIDDEN: u64 = 1;

public fun not_owner(): u64 {
    E_NOT_OWNER
}

public fun forbidden(): u64 {
    E_FORBIDDEN
}
