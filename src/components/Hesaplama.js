import React, {useState, useEffect} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {Label} from "reactstrap";
import {Table, Input, Button} from "reactstrap";
import {v4 as uuidv4} from "uuid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import axios from "../config/axios";

function Hesaplama({setBanks, banks}) {
  // Accordion
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const [text, setText] = useState({
    interest: "",
    vade: "",
  });
  //  GET
  const Save = () => {
    axios
      .get("banks")
      .then((res) => {
        let a = res.data.data.filter((bank) => {
          let getInt = bank.interests.filter((b) => {
            console.log(selectVadeType, vade);
            if (b.credit_type === selectVadeTypeID) {
              return b;
            }
          });

          if (getInt.length !== 0) {
            bank.interests = getInt;
            return bank;
          }
        });
        console.log(a);
        setBanks(a);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // VADE
  const getVade = () => {
    axios
      .get("banks")
      .then((res) => {
        const arr = [];
        res.data.data.forEach((bank) => {
          if (bank.interests.length > 0) {
            const VadeType = bank.interests.some(
              (interest) => interest.credit_type === 3
            );

            if (VadeType) {
              arr.push(bank);
            }
          }
        });

        setBanks(arr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [key, setKey] = useState("home");
  const [selectVadeType, setSelectVadeType] = useState([]);
  const [selectVadeTypeID, setSelectVadeTypeID] = useState();
  const [krediMiktari, setKrediMiktari] = useState();

  const vadeler = [
    {key: 3, val: 12},
    {key: 4, val: 24},
    {key: 5, val: 36},
    {key: 6, val: 5},
    {key: 7, val: 10},
  ];

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
      : []
  );

  // tür
  const change_tür_Type = (event) => {
    setSelectVadeType(event.target.value);
    setSelectVadeTypeID(
      event.target.value === "Tüketici"
        ? 2
        : event.target.value === "Mevduat"
        ? 3
        : event.target.value === "Konut"
        ? 1
        : 0
    );

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
        : []
    );
  };

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Kredi Faizi" value="1">
          {/* KREDİ FAİZİ */}
          <Table>
            <thead>
              <tr>
                <th>
                  <Label for="exampleSelect">Kredi Türü</Label>
                  <Input
                    type="select"
                    name="select"
                    id="credit_type"
                    onChange={(event) => change_tür_Type(event)}
                  >
                    <option value="0">Lütfen tür seçiniz!</option>
                    <option id="1">Konut</option>
                    <option id="2">Tüketici</option>
                  </Input>
                </th>
                <th>
                  <Label for="exampleSelect">Vade</Label>
                  <Input
                    type="select"
                    name="select"
                    onChange={(event) => setSelectVadeType(event.target.value)}
                    value={selectVadeType}
                  >
                    <option value="0"></option>
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
                  <p>Kredi Miktarı</p>
                  <input
                    type={"number"}
                    value={krediMiktari}
                    onChange={(event) => setKrediMiktari(event.target.value)}
                  />
                  <Button color="success" onClick={Save}>
                    BUL
                  </Button>
                </th>
              </tr>
            </thead>
          </Table>
          <Accordion flush open={open} toggle={toggle}>
            {banks.map((bank) => {
              return bank.interests.map((a) => {
                console.log(bank);
                return (
                  <AccordionItem key={bank.id}>
                    <AccordionHeader targetId={bank.id}>
                      {bank.bank_name}
                    </AccordionHeader>
                    <AccordionBody accordionId={bank.id}>
                      {bank.bank_name}
                      <hr />
                      Banka Adı = <label> {bank.bank_name}</label>
                      <br />
                      Hesaba Yatacak Tutar =<label>{krediMiktari}</label>
                      <br />
                      Aylık Ödeme =<label>{krediMiktari * a.interest}</label>
                      <br />
                      Toplam Geri Ödeme =
                      <label>
                        {parseFloat(krediMiktari) +
                          parseFloat(krediMiktari) * parseFloat(a.interest)}
                      </label>
                      <br />
                    </AccordionBody>
                  </AccordionItem>
                );
              });
            })}
          </Accordion>
        </Tab>
        {/* MEVDUAT */}
        <Tab eventKey="profile" title="Mevduat Faizi" value="2">
          <Table>
            <thead>
              <tr>
                <th>
                  <Label for="exampleSelect">Vade</Label>
                  <Input type="select" name="select">
                    <option value="0">Kredi vadesini seçiniz!</option>
                    <option id="1">3 Ay</option>
                    <option id="2">6 Ay</option>
                    <option id="3">12 Ay</option>
                  </Input>
                </th>
                <th>
                  <p>Yatırılacak Para</p>
                  <input type="tel" placeholder="TL"></input>
                  <Button color="success" onClick={getVade}>
                    BUL
                  </Button>
                </th>
              </tr>
            </thead>
          </Table>
          <Accordion flush open={open} toggle={toggle}>
            {banks.map((bank) => {
              return bank.interests.map((b) => {
                console.log(bank);
                console.log(bank);
                console.log(getVade);

                return (
                  <AccordionItem key={bank.id}>
                    <AccordionHeader targetId={bank.id}>
                      {bank.bank_name}
                    </AccordionHeader>
                    <AccordionBody accordionId={bank.id}>
                      {bank.bank_name}
                      <hr />
                      Mevduat Tutarı =
                      <label>
                        {krediMiktari * b.interest * b.selectVadeType}
                      </label>
                      <br />
                      12 ay sonunda alınacak faiz =
                      <label>
                        {(krediMiktari / 100) *
                          (b.interest / 12) *
                          b.selectVadeType}
                      </label>
                      <br />
                      12 ay sonunda atoplam mevduat =
                      <label>
                        {(krediMiktari / 100) * b.interest * b.selectVadeType}
                      </label>
                      <br />
                    </AccordionBody>
                  </AccordionItem>
                );
              });
            })}
          </Accordion>
        </Tab>
      </Tabs>
    </>
  );
}

export default Hesaplama;
