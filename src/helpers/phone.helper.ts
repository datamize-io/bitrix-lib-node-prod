export class PhoneHelper {
  static getAllVariationsOfSamePhones(phones: (string | number)[]): Array<string> {
    console.log("Verificando os números");

    const result = new Set(phones.map((p) => String(p).replace("+", "")));

    [...result].forEach((phone: string) => {
      if (!phone.startsWith("55") && phone.length < 10) return;
      if (!phone.startsWith("55") && (phone.length === 10 || phone.length === 11)) {
        phone = "55" + phone;
      }

      // Sem o 9 após o DDD
      if (phone.length === 12) {
        const withNine = phone.slice(0, 4) + "9" + phone.slice(4);
        result.add(withNine);
        result.add(`+${withNine}`);
        result.add(`${withNine.slice(2)}`);
      }

      // Com o 9, remover para criar variação
      if (phone.length === 13 && phone[4] === "9") {
        const withoutNine = phone.slice(0, 4) + phone.slice(5);
        result.add(withoutNine);
        result.add(`+${withoutNine}`);
        result.add(`${withoutNine.slice(2)}`);
      }

      result.add(`+${phone}`);
      result.add(`${phone.slice(2)}`);
    });

    return Array.from(result);
  }
}
