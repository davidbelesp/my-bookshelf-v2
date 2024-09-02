enum Types {
    LightNovel = "Light Novel",
    Novel = "Novel",
    Manga = "Manga",
    Manhwa = "Manhwa",
    Manhua = "Manhua",
    WebNovel = "Web Novel",
}

export function getTypes() : string[] {
    return Object.values(Types);
}

export function getTypesDropdown() : {value: string, label: string}[] {
    
        return getTypes().map(type => {
            return {
                value: type,
                label: type
            }
        });
    
    }

export default Types;