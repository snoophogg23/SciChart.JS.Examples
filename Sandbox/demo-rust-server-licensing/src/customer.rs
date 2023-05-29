use std::ffi::{OsString, OsStr};

use libloading;
use widestring::U16String;

pub fn set_assembly_name(assembly_name: &U16String, path: &OsStr) -> Result<
bool, Box> {
unsafe {
let lib = libloading::Library::new(path)?;
let func: libloading::Symbol
bool> =
lib.get(b"CSharp_NativeCredentials_SetAssemblyName")?;
Ok(func(assembly_name))
}
}

pub fn set_runtime_license_key(key: &U16String, path: &OsStr) -> Result> {
unsafe {
let lib = libloading::Library::new(path)?;
let func: libloading::Symbol
bool> =
lib.get(b"CSharp_NativeCredentials_SetRuntimeLicenseKeyW")?;
Ok(func(key))
}
}

pub fn validate_challenge(challenge: &OsString, path: &OsStr) -> Result<
OsString, Box> {
unsafe {
let lib = libloading::Library::new(path)?;
let func: libloading::Symbol
OsString> =
lib.get(b"CSharp_NativeCredentials_ValidateChallenge")?;
Ok(func(challenge))
}
}

pub fn dump(path: &OsStr) -> Result> {
unsafe {
let lib = libloading::Library::new(path)?;
let func: libloading::Symbol OsString> =
lib.get(b"CSharp_NativeCredentials_Dump")?;
Ok(func())
}
}

#[cfg(test)]
mod test {
use super::*;

use std::{env, path::Path};

#[test]
fn test_dump() {
let path = env::var("CARGO_MANIFEST_DIR").unwrap();
let path = Path::new(path.as_str()).join("AbtLicensingNative");

let assembly_name = "AqueductFluidicsApp";
let assembly_name = U16String::from(assembly_name);

let out = set_assembly_name(&assembly_name, path.as_os_str());
println!("{:?}", &out);

let key =
"/Gnv6xQm3Vn2sNbp+oEGoDbbeYhb9vJdb4QZHU9X+Bu7g8V9/SzFURfsdgIkxGgzHhNICV0Ye5GsMSfoKHlvvPwALxuRNWv0P2smWfjvuFSOoUvQ1N7zqKGnjPhkhH8BVM7tkjU0m50fILJKPBCGM69zP5ygQFP7uVu7UkOKd2WedoOo+6NashPQfP2NcnpEd00Arvb2Cng0AQh5uyUfkhoq+muh9h6JKYI4dTTa42CAciiGgmWJC3NDsY1HPhVSmnrJTloEWHoNE39Rdh/WG+qhMqihgvvo/s9229DC/P00bCgdd7/VeYFAKRjwCvoRhBpXMZKPOHx5bSbtf8KFVPls0gEYu79jptQ63azWsGg9lI4+sxt5sgiodlUCXE84eyE8gGjF1CJ+bdLixGqfaPXVQ3G9qnZ4N9Co2YskilabN+WqehSL+a9FRHYePeIcEIrE8+UJ43GtQqVut71D/SptWFFybaA3qjNNQ/Q2neW+5fgEYyxvxi8T9Jh7MFWg6g3Ra5n6dvyr6zvpWM4A+wuNt/kwysO4p0i2KuE086W2EDvrvtvIsVzrUYT6FuYWFkOPTJaTX5qSfS1zZm/8u5qGa7/N7xUbvdFeuW0bNRgCmVq5bapAEt11ZyrRvGmlJjvwWiJKq/2X4PHx09IHG4RsyhUF9zqwfMlM3674QGPOkeB6"
;
let key = U16String::from(key);

let out = set_runtime_license_key(&key, path.as_os_str());
println!("{:?}", &out);

// let out = dump(path.as_os_str());
// println!("{:?}", &out);
}
}