<?php
function checkIsbn($isbn)
{
    $isbnExploded = str_split($isbn);

    if (count($isbnExploded) == 10) {

        $data = [];
        for ($i = 10, $j = 0; $i >= 1; $i--, $j++) {
            $data[] = $isbnExploded[$j] * $i;
        }

        $sum = array_sum($data);

        if ($sum % 11 === 0) {
            return true;
        }

        return 0;
    }

    return 0;
}

print_r(checkIsbn('0307887898'));
