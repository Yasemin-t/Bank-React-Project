import React, {useState} from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

function Accordion({bank, banks}) {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div>
      <Accordion flush open={open} toggle={toggle}>
        {banks.map((bank) => {
          return (
            <AccordionItem key={banks.id}>
              <AccordionHeader targetId={bank.id}>
                {bank.bank_name}
              </AccordionHeader>

              <AccordionBody accordionId={bank.id} className="accordion">
                <Button
                  type="button"
                  color="danger"
                  onClick={() => removeBank(bank.id)}
                ></Button>
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default Accordion;
