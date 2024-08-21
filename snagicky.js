const databaseUrl = "http://localhost:8080";
const panel = "card-panel";
let scroll = [0,25];
const admin = {
    apiKey: "api-text-input",
    Note: "admin-note",
    Background: "admin-background",
    admin_power: "admin-control-pannel",
    admin_power_checkbox: "admin-powers-checkbox",
    admin_power_edition: "admin-creating-edition",
    admin_power_type: "admin-create-new-type",
    admin_power_type_t: "admin-create-new-type-type",
    admin_power_pass: "admin-create-passive",
    admin_power_pass_des: "admin-create-passive-des"
}
let card = {
    id: "ID",
    name: "search-card-name",

    total_cost:  "search-total-cost",
    multi_cost:  "search-multi-cost",
    red_cost: "search-red-cost",
    blue_cost: "search-blue-cost",
    white_cost: "search-white-cost",
    green_cost: "search-green-cost",

    total_toggle:  "search-total-toggle",
    multi_toggle:  "search-multi-toggle",
    red_toggle: "search-red-toggle",
    blue_toggle: "search-blue-toggle",
    white_toggle: "search-white-toggle",
    green_toggle: "search-green-toggle",

    type_text: "search-type-text",
    type: "search-type",
    sub_type: "search-sub-type",
    desc: "search-description",
    story: "search-description-story",

    attdeff: "att-deff",
    edition: "search-edition",
    edition_text: "search-edition-text",
    creater: "search-creator",

    rarity: "search-rarity",
    passives: "search-passives-selector",
    background: "",
    passivesArr: []
}
function clearSearch(){
    scroll[0] = 0;
    document.getElementById(panel).innerHTML ="";
}
function restartSearchCard(){
    const clear = [
        card.id,card.name,card.total_cost,card.multi_cost,card.red_cost,card.blue_cost,
        card.white_cost,card.green_cost,card.type,card.type_text,card.desc,card.attdeff,card.edition,
        card.rarity,card.creater,card.edition_text,card.story
    ];
    const equal = [
        card.total_toggle,card.multi_toggle,card.red_toggle,card.blue_toggle,card.white_toggle,card.green_toggle
    ];

for (let i = 0; i < equal.length; i++){
        document.getElementById(equal[i]).value = "0";
        document.getElementById(equal[i]).innerHTML = "=";
  }
for (let i = 0; i < card.passivesArr.length; i++)
  document.getElementById(card.passivesArr[i]).checked = false;
for (let i = 0; i < clear.length; i++)
        document.getElementById(clear[i]).value = null;
}

async function createEdition(){
    if(confirm("Chceš vytvořit novou edici?")){
    const name = document.getElementById(admin.admin_power_edition).value

    const req = databaseUrl + "/edition/create/" + name +"/" + document.getElementById(admin.apiKey).value;
    try {
            const response = await fetch(req,{method: "Post"});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    } catch (error) {
        console.error(error.message);
    }

}}
async function createType(){
    if(confirm("Chceš vytvořit onvý typ karty?")){
    const name = document.getElementById(admin.admin_power_type).value;
    const type = document.getElementById(admin.admin_power_type_t).value;

    const req = databaseUrl + "/type/create/" + name +"/" + type +"/" + document.getElementById(admin.apiKey).value;
    console.log(req)
    try {
            const response = await fetch(req,{method: "Post"});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    } catch (error) {
        console.error(error.message);
    }

}}

async function createPassive(){
    if(confirm("Chceš vytvořit novou vlastnost?")){
    const name = document.getElementById(admin.admin_power_pass).value;
    const des = document.getElementById(admin.admin_power_pass_des).value;

    const req = databaseUrl + "/passive/create/" + name +"/" + des +"/" + document.getElementById(admin.apiKey).value;
    console.log(req)
    try {
            const response = await fetch(req,{method: "Post"});
    if (!response.ok) {
      GetPassives();
      throw new Error(`Response status: ${response.status}`);
    }
    } catch (error) {
        console.error(error.message);
    }

}}

async function deleteType(){
    if(confirm("Chceš tento typ?")){
    const req = databaseUrl + "/type/delete/" + document.getElementById(card.type).value +"/" + document.getElementById(admin.apiKey).value;
    try {
            const response = await fetch(req,{method: "Delete"});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    } catch (error) {
        console.error(error.message);
    }

}}

async function deletePassive(){
  const pass = passivesTable();
    if( pass.length == 1 && confirm("Chceš smazat tuto vlastnost?")){
    const req = databaseUrl + "/passive/delete/" + pass[0] +"/" + document.getElementById(admin.apiKey).value;
    try {
            const response = await fetch(req,{method: "Delete"});
    if (!response.ok) {
      GetPassives();
      throw new Error(`Response status: ${response.status}`);
    }
    } catch (error) {
        console.error(error.message);
    }

}}

function adminPowers(){
  var checkBox = document.getElementById(admin.admin_power_checkbox);
  var text = document.getElementById(admin.admin_power);
  if (checkBox.checked == true){
    text.style.display = "flex";
  } else {
    text.style.display = "none";
  }
} 

/*
        <div class="card">
            <div class="card-background">
                <div class="card-id">
                    <p class="card-name">Ve vlčí kůži</p>
                    <div class="card-cost">
                        <div class="multi-cost"></div>
                        <div class="red-cost"></div>
                        <div class="white-cost"></div>
                        <div class="blue-cost"></div>
                        <div class="green-cost"></div>
                    </div>
                </div>
                <div class="card-picture"></div>
                <div class="card-type">
                    <p class="card-type-name">Očarování bytosti</p>
                    <p class="card-type-id">1</p>
                </div>
                <div class="card-text">
                    <div></div>
                    <p class="card-description">Očarovaná bytost má +2/+2</p>
                    <p class="card-story">"Vlkem jsem se stát chětl, ale skončit jako omega naší smečky jsem si vážně nepřál...</p>
                </div>
                <div class="card-information">
                    <div class="card-edition-icon"></div>
                    <p class="card-edition-text">Osmá edice 2020</p>
                    <p class="card-attack-deffense" style="color: white;">1/1</p>
                </div>
            </div>
        </div>
*/

function addCard(id,name,type,rarity,creator,edition,description,story,att_deff_type,attack,defense,multi,white,green,blue,red,cost,background,passives){
    let card = '<div class="card"><div class="card-background"><div class="card-id"'
    card += ((att_deff_type == 2)?'style="justify-content: flex-start;" ':'') + '><p class="card-name">';
    card += name + '</p><div class="card-cost">';

    let stringCost = '' + cost;
    let mana_total_cost = 0;
    if(stringCost.length > 0 && stringCost != "null"){
        card += stringCost;
    }else{
        const mana_cost = [multi,red,white,blue,green];
        const mana_html = ["multi","red","white","blue","green"];

        for(let i = 0;i < mana_cost.length;i++){
            mana_total_cost += mana_cost[i];
            if(mana_cost[i] > 0){
                card += '<div class="' + mana_html[i] + '-cost">' + ((mana_cost[i]*1 == 1)?(''):(mana_cost[i] + '')) + '</div>';
            }
        }
        if(mana_total_cost == 0 && att_deff_type != 2)
            card += '<div class="multi-cost">0</div>';
    }

    card += '</div></div><div class="card-picture"></div><div class="card-type"><p class="card-type-name">';
    card += type + '</p><p class="card-type-id">';
    card += id + '</p></div><div class="card-text"><p class="passives-text">'
    let ar = [];ar = passives;
    for (let i = 0;i<ar.length;i++)
        card += ((i > 0)?', ':'') + '<span title="'+ ar[i].Description +'">' +ar[i].Name + '</span> ';
    card += '</p><p class="card-description">';
    card += description + '</p><p class="card-story">';
    card += story + '</p></div><div class="card-information"><div class="card-edition-icon"><p>';
    card += rarity + '</p></div><p class="card-edition-text">';
    let stringCreator = '' + creator;
    card += ((stringCreator.length > 0)?(stringCreator+ ', '):'') + edition + '</p><p class="card-attack-deffense"';
    switch (att_deff_type){
        case 0: card += '>';break;
        case 1: card += '>' + attack + '/' + defense;break;
        case 2: card += '>';break;
        case 3: card += ' style="color: white;">' + attack + '/' + defense;break;
        default: card += '>x/x'
    }
    card += '</p></div></div></div>';
    
    
    document.getElementById(panel).innerHTML += card;
}
async function GetCards(){
    const parm= [
        ["id",document.getElementById(card.id).value],
        ["edition",document.getElementById(card.edition).value],
        ["name",document.getElementById(card.name).value],
        ["type",document.getElementById(card.type).value],
        ["rarity",document.getElementById(card.rarity).value],
        ["description",document.getElementById(card.desc).value],
        ["story",document.getElementById(card.story).value],
        ["creator",document.getElementById(card.creater).value],

        ["total",document.getElementById(card.total_cost).value],
        ["multi",document.getElementById(card.multi_cost).value],
        ["white",document.getElementById(card.white_cost).value],
        ["blue",document.getElementById(card.blue_cost).value],
        ["red",document.getElementById(card.red_cost).value],
        ["green",document.getElementById(card.green_cost).value],

        ["totalToggle",document.getElementById(card.total_toggle).value],
        ["multiToggle",document.getElementById(card.multi_toggle).value],
        ["whiteToggle",document.getElementById(card.white_toggle).value],
        ["blueToggle",document.getElementById(card.blue_toggle).value],
        ["redToggle",document.getElementById(card.red_toggle).value],
        ["greenToggle",document.getElementById(card.green_toggle).value]
    ]
    const params = new URLSearchParams();
// attack / deff
const attDeff = document.getElementById(card.attdeff).value;
    if(attDeff[1] == "/"){
      params.set("attack",Number(attDeff[0]));
      params.set("defense",Number(attDeff[2]));
    }else if(attDeff.length > 0){
      params.set("att-def",Number(attDeff))
    }



    for(let i = 0;i < parm.length;i++){
        if(parm[i][1].length > 0 && parm[i][1] != "null")
            params.set(parm[i][0],parm[i][1]);
    }
    params .set("offset",scroll[0] * scroll[1]);
    params.set("limit",scroll[1]);
    const req = databaseUrl + "/card/get?" + params.toString();
    console.log(req)
  try {
    const response = await fetch(req,{"method": "Get"});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    for(let i = 0;i < json.length;i++) {
            let ar = []
            ar = json[i].Editions;
            addCard(
                json[i].Id,
                json[i].Name,
                json[i].Type.Name,
                json[i].Rarity,
                json[i].Creator,
                ar[0].Name,
                json[i].Description,
                json[i].Story,
                json[i].Type.CardType,
                json[i].Attack,
                json[i].Defense,
                json[i].Multi,
                json[i].White,
                json[i].Green,
                json[i].Blue,
                json[i].Red,
                json[i].Cost,
                json[i].Background,
                json[i].Passives
            )
    }


  } catch (error) {
    console.error(error.message);
  }

}
async function GetTypeSearch(){

    const req = databaseUrl + "/type/get?"
    const params = new URLSearchParams();

    let subType = document.getElementById(card.sub_type).value;

        params.set("name",document.getElementById(card.type_text).value);
    if(subType != -1)
        params.set("type",subType);
        params.set("offset",0);
        params.set("limit",scroll[1]);
  try {
    const response = await fetch(req + params.toString(),{"method": "Get"});
    
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    document.getElementById(card.type).innerHTML = '<option value="null">Typ</option>';
    for (let i = 0;i < json.length;i++)
        document.getElementById(card.type).innerHTML += '<option value="' + json[i].Id + '">' + json[i].Name + '</option>';

  } catch (error) {
    console.error(error.message);
  }
}
async function GetEditionSearch(){
    document.getElementById(card.edition).innerHTML = '<option value="null">Edice</option>';
    const req = databaseUrl + "/edition/get?"
    const params = new URLSearchParams();
        params.set("name",document.getElementById(card.edition_text).value);
        params.set("offset",0);
        params.set("limit",scroll[1]);
  try {
    const response = await fetch(req + params.toString(),{"method": "Get"});
    
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    for (let i = 0;i < json.length;i++){
        document.getElementById(card.edition).innerHTML += '<option value="' + json[i].Id + '">' + json[i].Name + '</option>';}

  } catch (error) {
    console.error(error.message);
  }
}
async function GetPassives(){
    document.getElementById(card.passives).innerHTML = "";
    card.passivesArr = [];

    const req = databaseUrl + "/passive/get"
  try {
    const response = await fetch(req,{"method": "Get"});
    
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    for (let i = 0;i < json.length;i++){
        document.getElementById(card.passives).innerHTML += '<p>' + json[i].Name + ' <input type="checkbox" id="passive-checkbox-' + json[i].Name + '" value="' + json[i].Id + '" title="' + json[i].Description + '"></p>';
        card.passivesArr[i] = "passive-checkbox-" + json[i].Name;
    }

  } catch (error) {
    console.error(error.message);
  }
}

function OnLoad(){
    GetCards();
    GetTypeSearch();
    GetPassives();
    GetEditionSearch();
    adminPowers();
}

function passivesTable(){
  let passivesArray = [];
  for (let i = 0;i < card.passivesArr.length;i++){
    const box = document.getElementById(card.passivesArr[i]);
    if(box.checked)
      passivesArray[passivesArray.length] = box.value;
  }
  return passivesArray;
}

async function connectEdition() {
  if(confirm("Chceš propojit tuto edici s kartou?")){
    const req = databaseUrl + "/card/edition/" + document.getElementById(card.id).value + "/" + document.getElementById(card.edition).value + "/" + document.getElementById(admin.apiKey).value
    try {
      const response = await fetch(req,{method: "Put"});
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const id = await response.text();
    } catch (error) {
      console.error(error.message);
    }
  }
}

async function cardJoinPassives(card_id){
  const req = databaseUrl + "/card/passives/" + card_id + "/" + document.getElementById(admin.apiKey).value;
  
  try {
    const response = await fetch(req,{
                method: "Put",
                body: JSON.stringify(passivesTable()),
                headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const id = await response.text();
        
        } catch (error) {
            console.error(error.message);
        }


}
async function deleteEdition(){
  if(confirm("Chceš vymazat tuto edici?") && confirm("Seš si jistý?")){
    const req = databaseUrl + "/edition/delete/" + document.getElementById(card.edition).value + "/" + document.getElementById(admin.apiKey).value
    try {
      const response = await fetch(req,{method: "Delete"});
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const id = await response.text();
    } catch (error) {
      console.error(error.message);
    }
  }
}
function checkIfScrollBottom(that){
  if (that.offsetHeight + that.scrollTop >= that.scrollHeight) {
    console.log("gay af")
    scroll[0]++;
    GetCards()
  }
}
async function CardCreation(){
    if(confirm("Chceš vytvořit novou kartu?")){


        const params = new URLSearchParams();
        params.set("editionId",document.getElementById(card.edition).value)

        const att_deff = [document.getElementById(card.attdeff).value[0],document.getElementById(card.attdeff).value[2]]
        const req_body = {                    
                        "Name": document.getElementById(card.name).value,
                        "Description": document.getElementById(card.desc).value,
                        "Story": document.getElementById(card.story).value,
                        "Note": document.getElementById(admin.Note).value,
                        "Type": {"Id":Number(document.getElementById(card.type).value)},

                        "Attack": ((att_deff[0] != "x")?Number(att_deff[0]):null),
                        "Defense": ((att_deff[1] != "x")?Number(att_deff[1]):null),

                        "Multi": Number(document.getElementById(card.multi_cost).value),
                        "Red": Number(document.getElementById(card.red_cost).value),
                        "Blue": Number(document.getElementById(card.blue_cost).value),
                        "Green": Number(document.getElementById(card.green_cost).value),
                        "White": Number(document.getElementById(card.white_cost).value),
                        "Background": Number(document.getElementById(admin.Background).value),
                        "Creator": document.getElementById(card.creater).value,
                        "Rarity": document.getElementById(card.rarity).value,

                        "Passives": [],
                        "Editions": []
                        //"Cost": document.getElementById(card.multi_cost).value,     
                        // kdyžtak změnit a přidat kolonku do admin toolek na vypisování tohohle
                    }
        const req = databaseUrl + "/card/create/" + document.getElementById(admin.apiKey).value + "?";
        try {
                const response = await fetch(req + params.toString(),{
                method: "Post",
                body: JSON.stringify(req_body),
                headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const id = await response.text();
        document.getElementById(card.id).value = id;

        if(passivesTable().length > 0)
          cardJoinPassives(Number(id));
        
        } catch (error) {
            console.error(error.message);
        }

    }
}
async function DeleteCard(){
    if(confirm("Chceš smazat tuto kartu? ( Id: " + document.getElementById(card.id).value +" )")){

    const req = databaseUrl + "/card/delete/" + document.getElementById(card.id).value + "/" + document.getElementById(admin.apiKey).value;
    try {
            const response = await fetch(req,{method: "Delete"});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    } catch (error) {
        console.error(error.message);
    }

}}
async function NewCards(){

    const params = new URLSearchParams();
        params.set("offset",scroll[0] * scroll[1]);
        params.set("limit",scroll[1]);
    const req = databaseUrl + "/card/get/new?" + params.toString();
    try {
            const response = await fetch(req,{
            method: "Get",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    clearSearch();
    for(let i = 0;i < json.length;i++) {
      let edi = ""; 
      try{edi = json[i].Editions[0].Name}
      catch{edi = "null"}
            addCard(
                json[i].Id,
                json[i].Name,
                json[i].Type.Name,
                json[i].Rarity,
                json[i].Creator,
                edi,
                json[i].Description,
                json[i].Story,
                json[i].Type.CardType,
                json[i].Attack,
                json[i].Defense,
                json[i].Multi,
                json[i].White,
                json[i].Green,
                json[i].Blue,
                json[i].Red,
                json[i].Cost,
                json[i].Background,
                json[i].Passives
            )
    }
    document.getElementById(card.id).value = id;
    } catch (error) {
        console.error(error.message);
    }
}

function searchReq(){
  clearSearch();
  GetCards();
}

function valueSwitch(that){
  if(that.innerHTML == "="){
    that.innerHTML = '&#8806'
    that.value = 1;
  }else if(that.innerHTML == "≦"){
    that.innerHTML = '>'
    that.value = -1;
  }else{
    that.innerHTML = '='
    that.value = 0;
  }
}

window.onload = OnLoad;