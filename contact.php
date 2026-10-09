<?php
// Formulario de contacto de ZX Consulting Solutions (IONOS: PHP mail()).
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }
if (!empty($_POST['web'])) { echo '{"ok":true}'; exit; } // honeypot anti-spam

$clean = fn($k) => trim(preg_replace('/[\r\n]+/', ' ', strip_tags($_POST[$k] ?? '')));
$name = $clean('name'); $email = $clean('email'); $company = $clean('company');
$message = trim(strip_tags($_POST['message'] ?? ''));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422); echo '{"ok":false}'; exit;
}

$to = 'info@zxconsulting.solutions';
$subject = '=?UTF-8?B?' . base64_encode("Nuevo contacto web: $name") . '?=';
$body = "Nombre: $name\nEmail: $email\nEmpresa: $company\n\n$message\n";
$headers = "From: web@zxconsulting.solutions\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

$ok = mail($to, $subject, $body, $headers);
http_response_code($ok ? 200 : 500);
echo json_encode(['ok' => $ok]);
