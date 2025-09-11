import React, { useEffect } from "react";
import Page from "./Page";
import Reservation from "./Reservation";

function Reservations() {
  return (
    <Page title="Rezervacije" description="Ovde su sve vaše primljene rezervacije">
      <div className="app-table__wrapper">
        <table className="app-table reservations-table">
          <thead>
            <tr className="app-table-row app-table-row--thead">
              <th>ID</th>
              <th>Status</th>
              <th>Gost</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Datum dolaska</th>
              <th>Datum odlaska</th>
              <th>Broj noćenja</th>
              <th>Broj gostiju</th>
              <th>Cena noćenja</th>
              <th>Popust</th>
              <th>Cena noćenja sa popustom</th>
              <th>Napomena</th>
            </tr>
          </thead>
          
          <tbody>
            <tr className="app-table-row app-table-row--tbody">
              <Reservation />
            </tr>

            <tr className="app-table-row app-table-row--tbody">
              <Reservation />
            </tr>
          </tbody>
        </table>
      </div>
    </Page>
  )
}

export default Reservations;