import React, {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Accordion,
  AccordionItem,
  AccordionBody,
  AccordionHeader,
  Table,
} from "reactstrap";
import icon from "../images/plus.webp";
import axios from "../config/axios";

const Bankadd = () => {
  // modal open
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // Accordion
  const [open, setOpen] = useState();
  const [banks, setBanks] = useState([]);

  // burada tüm eklediğim bankaları ekrana getiriyorum
  useEffect(() => {
    axios.get("banks").then((res) => setBanks(res.data.data));
  }, []);

  // localStorage getleyip token aldım ve bunu bir değişkene atadım
  let bankName = localStorage.getItem("jwt");

  // POST
  const [data, setData] = useState({
    bank_name: "",
  });
  const onSubmit = () => {
    axios
      .post("banks", {
        bank_name: data.bank_name,
      })
      .then((res) => {
        setBanks((banks) => [...banks, res.data.data]);
        getBank();
        toggle("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  GET
  const getBank = () => {
    axios
      .get("banks")
      .then((res) => {
        setBanks(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE(Tüm banka bilgilerini siler)
  const removeBank = (bankaId) => {
    console.log(bankaId);
    axios
      .delete("banks", {
        data: {
          id: bankaId,
        },
      })
      .then((response) => {
        getBank();
      })
      .catch((error) => {
        localStorage.remove(bankName);
      });
  };

  // DELETE(Tek bir banka bilgisini siler)
  const singleRemoveBank = (interestId, bankaId) => {
    console.log(interestId);
    console.log(bankaId);
    axios
      .delete("interests", {
        data: {
          id: interestId,
          bank_id: bankaId,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          const newBank = banks.map((b) => {
            if (b.id === bankaId) {
              b.interests = b.interests.filter((i) => i.id !== interestId);
            }
            return b;
          });
          console.log(newBank);
          console.log(interestId, bankaId);
          setBanks(newBank);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  const changeTur_Type = (event) => {
    setselectVadeType(
      event.target.value === "Tüketici"
        ? 2
        : event.target.value === "Mevduat"
        ? 3
        : event.target.value === "Konut"
        ? 1
        : 0
    );
    console.log(event.target.value);
    setVade(
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
        : event.target.value === "Mevduat"
        ? [
            {val: "3Ay", key: "1"},
            {val: "6Ay", key: "2"},
            {val: "12Ay", key: "3"},
          ]
        : []
    );
  };

  // kaydet
  const [text, setText] = useState({
    interest: "",
    vade: "",
  });

  const save = (id) => {
    console.log(text.interest);
    console.log(selectVadeType);
    console.log(text.vade);

    axios
      .post("interests", {
        bank_id: id,
        interest: parseFloat(text.interest),
        credit_type: parseInt(selectVadeType),
        time_option: parseInt(text.vade),
      })
      .then((res) => {
        console.log(res.data.status == "success") && getBank();
      })
      .catch((error) => {
        console.log(error);
        console.log(data);
      });
  };

  // ROW Ekleme
  const newAdd = (bankamID) => {
    console.log(bankamID);
    banks.map((v) => console.log(v));
    const myBank = banks.map((bb) => {
      if (bb.id === bankamID) {
        bb.interests = [
          ...bb.interests,
          {
            id: Math.floor(Math.random() * 9999),
            bank_id: 0,
            interest: 0,
            time_option: 0,
            credit_type: 0,
          },
        ];
      }
      return bb;
    });
    setBanks(myBank);
  };

  // accordion fonksiyonu
  const openHandler = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-primary" role="alert">
              <Button color="primary" onClick={toggle}>
                Banka Ekle
              </Button>

              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Banka Kayıt</ModalHeader>
                <ModalBody>
                  <Label for="exampleName">Banka Adı</Label>
                  <Input
                    id="exampleName"
                    name="bank_name"
                    placeholder="Banka adı giriniz!"
                    type="name"
                    autoComplete="off"
                    value={data.bank_name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        bank_name: e.target.value,
                      })
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={onSubmit}>
                    EKLE
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Accordion open={open} toggle={openHandler}>
        {banks.map((bank) => {
          console.log(bank);
          return (
            <AccordionItem key={bank.id}>
              <AccordionHeader targetId={bank.id}>
                {bank.bank_name}
              </AccordionHeader>
              <AccordionBody accordionId={bank.id} className="accordion">
                <Button
                  type="button"
                  color="danger"
                  onClick={() => removeBank(bank.id)}
                >
                  SİL
                </Button>
                <Table>
                  {/* {bank.interest.map(interet=>{

                  })} */}
                  <thead>
                    <Button onClick={() => newAdd(bank.id)}>
                      <img className="icon" src={icon} />
                    </Button>
                    <tr>
                      <th>
                        <Label for="exampleSelect">Kredi Türü</Label>
                      </th>
                      <td>
                        <Input
                          type="select"
                          name="select"
                          id="credit_type"
                          onChange={(e) => changeTur_Type(e)}
                        >
                          <option value="0">Lütfen tür seçiniz!</option>
                          <option id="1">Konut</option>
                          <option id="2">Tüketici</option>
                          <option id="3">Mevduat</option>
                        </Input>
                      </td>
                      <th>
                        <Label for="exampleSelect">Vade</Label>
                      </th>
                      <td>
                        <Input
                          type="select"
                          name="select"
                          onChange={(e) =>
                            setText((prew) => ({...prew, vade: e.target.value}))
                          }
                          value={text.vade}
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
                      </td>
                      <th>
                        <p>Aylık Faiz Oranı</p>
                      </th>
                      <td>
                        <input
                          type="number"
                          value={text.interest}
                          onChange={(e) =>
                            setText((prev) => ({
                              ...prev,
                              interest: e.target.value,
                            }))
                          }
                        ></input>
                      </td>
                      <td>
                        <Button color="warning" onClick={() => save(bank.id)}>
                          Kaydet
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => singleRemoveBank(bank.id, bank.id)}
                          className="delete"
                        >
                          Sil
                        </Button>
                      </td>
                    </tr>
                  </thead>
                </Table>
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Bankadd;
