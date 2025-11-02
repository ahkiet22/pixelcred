#[allow(duplicate_alias)]
module prixel_cred::prixel_cred;

use std::string::String;
use sui::dynamic_field as df;
use sui::dynamic_object_field as odf;
use sui::event;
use sui::object;
use sui::transfer;
use sui::tx_context;


use prixel_cred::errors;
use prixel_cred::events;

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
    avatar_blob: vector<u8>,
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
    avatar_blob: vector<u8>,
    github: String,
    linkedin: String,
    website: String,
    bio: String,
    owner: address,
}

fun init(ctx: &mut TxContext) {
    let admin = AdminCap {
        id: object::new(ctx),
    };
    transfer::transfer(admin, tx_context::sender(ctx));
}

public entry fun create(
    name: String,
    username: String,
    avatar: String,
    avatar_blob: vector<u8>,
    github: String,
    linkedin: String,
    website: String,
    bio: String,
    ctx: &mut TxContext,
) {
    let uid = object::new(ctx);
    let id = object::uid_to_inner(&uid);

    let profile = Profile {
        id: uid,
        name,
        username,
        avatar,
        avatar_blob,
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
        avatar_blob: profile.avatar_blob,
        github: profile.github,
        linkedin: profile.linkedin,
        website: profile.website,
        bio: profile.bio,
        owner: profile.owner,
    });
    transfer::transfer(profile, tx_context::sender(ctx));
}

public entry fun view_profile(profile: &Profile) {
    let id = object::uid_to_inner(&profile.id);
    assert!(profile.verified == true, errors::forbidden());

    event::emit(ProfileView {
        id,
        name: profile.name,
        username: profile.username,
        avatar_blob: profile.avatar_blob,
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
public entry fun edit_profile(
    new_name: String,
    new_avatar: String,
    new_github: String,
    new_linkedin: String,
    new_website: String,
    new_bio: String,
    profile: &mut Profile,
    ctx: &mut TxContext,
) {
    let sender = tx_context::sender(ctx);
    assert!(sender == profile.owner, errors::not_owner());
    assert!(profile.verified == true, errors::forbidden());

    profile.name = new_name;
    profile.avatar = new_avatar;
    profile.github = new_github;
    profile.linkedin = new_linkedin;
    profile.website = new_website;
    profile.bio = new_bio;
}

public entry fun add_certificate(
    profile: &mut Profile,
    issuer: String,
    credential_id: String,
    meta: String,
    ctx: &mut TxContext,
) {
    let sender = tx_context::sender(ctx);
    assert!(sender == profile.owner, errors::not_owner());
    assert!(profile.verified == true, errors::forbidden());

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
    events::emit_builder_verified_event(profile_addr, admin_addr);
}
