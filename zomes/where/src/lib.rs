pub use hdk::prelude::*;
pub use hdk::prelude::Path;
pub use error::{WhereError, WhereResult};
pub mod error;
use hc_utils::*;
use std::collections::HashMap;

#[hdk_extern]
fn init(_: ()) -> ExternResult<InitCallbackResult> {
    // grant unrestricted access to accept_cap_claim so other agents can send us claims
    let mut functions = BTreeSet::new();
    functions.insert((zome_info()?.zome_name, "recv_remote_signal".into()));
    create_cap_grant(CapGrantEntry {
        tag: "".into(),
        // empty access converts to unrestricted
        access: ().into(),
        functions,
    })?;
    Ok(InitCallbackResult::Pass)
}

entry_defs![
    Path::entry_def(),
    Space::entry_def()
//    Where::entry_def()
];

/// A space
#[hdk_entry(id = "space")]
#[derive(Clone)]
pub struct Space {
    pub name: String,
    //pub dimensionality: CoordinateSystem,
    pub meta: HashMap<String, String>,  // usable by the UI for whatever
}

/*
#[hdk_entry(id = "where")]
#[derive(Clone)]
pub struct Where {
    location: String, // a location in a some arbitrary space (Json encoded)
    meta: HashMap<String, String>, // contextualized meaning of the location
}
*/

fn get_spaces_path() -> Path {
    Path::from("spaces")
}

#[hdk_extern]
fn create_space(input: Space) -> ExternResult<EntryHash> {
    let _header_hash = create_entry(&input)?;
    let hash = hash_entry(&input)?;
    let path = get_spaces_path();
    path.ensure()?;
    let anchor_hash = path.hash()?;
    create_link(anchor_hash, hash.clone(), ())?;
    Ok(hash)
}

#[hdk_extern]
fn get_spaces(_: ()) -> ExternResult<Vec<(EntryHash, Space)>> {
    let path = get_spaces_path();
    let pairs = get_spaces_inner(path.hash()?)?;
    Ok(pairs)
}

fn get_spaces_inner(base: EntryHash) -> WhereResult<Vec<(EntryHash, Space)>> {
    let entries = get_links_and_load_type(base, None)?;
    let mut pairs = vec![];
    for e in entries {
        pairs.push(( hash_entry(&e)?, e))
    }
    Ok(pairs)
}
