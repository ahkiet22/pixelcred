module prixel_cred::events;

use sui::event;

public struct BuilderVerifiedEvent has copy, drop {
    profile_addr: address,
    admin: address,
}

public fun emit_builder_verified_event(profile_addr: address, admin: address) {
    event::emit(BuilderVerifiedEvent {
        profile_addr,
        admin,
    });
}
