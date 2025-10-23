#[allow(duplicate_alias)]
module prixel_cred::prixel_cred;

use std::string::String;
use sui::dynamic_field as df;
use sui::dynamic_object_field as odf;
use sui::event;
use sui::object;
use sui::transfer;
use sui::tx_context;

//////////////////
/// ERRORS
/////////////////
const E_NOT_OWNER: u64 = 1;
const E_FORBIDDEN: u64 = 2;

//////////////////
/// Capability
/////////////////

public struct UsernameCap has key, store {
    id: UID,
    username: String,
    owner: address,
}
public struct ProjectCap has key, store {
    id: UID,
    title: String,
    link: String,
    description: String,
    owner: address,
}

/// Certificate cap object
public struct CertificateCap has key, store {
    id: UID,
    issuer: String,
    credential_id: String,
    meta: String,
    owner: address,
}
public struct AdminCap has key, store {
    id: UID,
}

public struct Profile has key, store {
    id: UID,
    name: String,
    username: String,
    avatar: String,
    github: String,
    linkedin: String,
    website: String,
    bio: String,
    owner: address,
    verified: bool,
}

public struct ProfileView has copy, drop {
    id: ID,
    name: String,
    username: String,
    avatar: String,
    github: String,
    linkedin: String,
    website: String,
    bio: String,
    owner: address,
}

public struct BuilderVerifiedEvent has copy, drop {
    profile_addr: address,
    admin: address,
}

fun init(ctx: &mut TxContext) {
    let admin = AdminCap {
        id: object::new(ctx),
    };
    transfer::transfer(admin, tx_context::sender(ctx));
}

public fun create(
    ctx: &mut TxContext,
    name: String,
    username: String,
    avatar: String,
    github: String,
    linkedin: String,
    website: String,
    bio: String,
) {
    let uid = object::new(ctx);
    let id = object::uid_to_inner(&uid);

    let profile = Profile {
        id: uid,
        name,
        username,
        avatar,
        github,
        linkedin,
        website,
        bio,
        owner: tx_context::sender(ctx),
        verified: false,
    };
    event::emit(ProfileView {
        id,
        name: profile.name,
        username: profile.username,
        avatar: profile.avatar,
        github: profile.github,
        linkedin: profile.linkedin,
        website: profile.website,
        bio: profile.bio,
        owner: profile.owner,
    });
    transfer::transfer(profile, tx_context::sender(ctx));
}

public fun view_profile(profile: &Profile) {
    let id = object::uid_to_inner(&profile.id);
    assert!(profile.verified == false, E_FORBIDDEN);

    event::emit(ProfileView {
        id,
        name: profile.name,
        username: profile.username,
        avatar: profile.avatar,
        github: profile.github,
        linkedin: profile.linkedin,
        website: profile.website,
        bio: profile.bio,
        owner: profile.owner,
    });
}

/////////////////////////
/// Only owner
////////////////////////
public fun edit_profile(
    profile: &mut Profile,
    ctx: &mut TxContext,
    new_name: String,
    new_avatar: String,
    new_github: String,
    new_linkedin: String,
    new_website: String,
    new_bio: String,
) {
    let sender = tx_context::sender(ctx);
    assert!(sender == profile.owner, E_NOT_OWNER);
    assert!(profile.verified == false, E_FORBIDDEN);

    profile.name = new_name;
    profile.avatar = new_avatar;
    profile.github = new_github;
    profile.linkedin = new_linkedin;
    profile.website = new_website;
    profile.bio = new_bio;
}

public fun add_certificate(
    profile: &mut Profile,
    ctx: &mut TxContext,
    issuer: String,
    credential_id: String,
    meta: String,
) {
    let sender = tx_context::sender(ctx);
    assert!(sender == profile.owner, E_NOT_OWNER);
    assert!(profile.verified == false, E_FORBIDDEN);

    let cert = CertificateCap {
        id: object::new(ctx),
        issuer,
        credential_id,
        meta,
        owner: sender,
    };
    // let profile_addr = object::uid_to_address(&profile.id);
    // transfer::transfer(cert, profile_addr);

    let key = object::uid_to_bytes(&cert.id);
    odf::add(&mut profile.id, key, cert);
}

/////////////////////////////////////
/// Admin verify builder (only admin)
////////////////////////////////////
public entry fun verify_builder(profile: &mut Profile, _: &AdminCap, ctx: &mut TxContext) {
    let admin_addr = tx_context::sender(ctx);
    profile.verified = true;

    let profile_addr = object::uid_to_address(&profile.id);
    event::emit(BuilderVerifiedEvent {
        profile_addr,
        admin: admin_addr,
    });
}
