import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";

function Rowekleme() {
  const [selectVadeType, setselectVadeType] = useState([]);
  // Vade
  const [vade, setVade] = useState(
    selectVadeType.type === 1
      ? [
          {val: "5Yıl", key: "6"},
          {val: "10Yıl", key: "7"},
        ]
      : selectVadeType.type === 2
      ? [
          {val: "12Ay", key: "3"},
          {val: "24Ay", key: "4"},
          {val: "36Ay", key: "5"},
        ]
      : selectVadeType.type === 3
      ? [
          {val: "3Ay", key: "1"},
          {val: "6Ay", key: "2"},
          {val: "12Ay", key: "3"},
        ]
      : []
  );

  // tür
  const change_tür_Type = (event) => {
    setselectVadeType(event.target.value);
    setVade(
      event.target.value === "Konut"
        ? [
            {val: "5Yıl", key: "6"},
            {val: "10Yıl", key: "7"},
          ]
        : event.target.value === "Tüketici"
        ? [
            {val: "12Ay", key: "3"},
            {val: "24Ay", key: "4"},
            {val: "36Ay", key: "5"},
          ]
        : event.target.value === "Mevduat"
        ? [
            {val: "3Ay", key: "1"},
            {val: "6Ay", key: "2"},
            {val: "12Ay", key: "3"},
          ]
        : []
    );
  };

  return (
    <div>
      <tr>
        <th>
          <Label for="exampleSelect">Kredi Türü</Label>
          <Input
            type="select"
            name="select"
            id="credit_type"
            onChange={(event) => change_tür_Type(event)}
          >
            <option id="1">Konut</option>
            <option id="2">Tüketici</option>
            <option id="3">Mevduat</option>
          </Input>
        </th>
        <th>
          <Label for="exampleSelect">Vade</Label>
          <Input type="select" name="select">
            {vade.map((value) => {
              return (
                <option value={value.key} key={uuidv4()}>
                  {value.val}
                </option>
              );
            })}
          </Input>
        </th>
        <th>
          <p>Aylık Faiz Oranı</p>
          <input></input>
          <Button color="warning">Kaydet</Button>
          <Button
            color="danger"
            onClick={(e) => singleRemoveBank(bank.id, bank.bank_id)}
          >
            Sil
          </Button>
        </th>
      </tr>
    </div>
  );
}

export default Rowekleme;
