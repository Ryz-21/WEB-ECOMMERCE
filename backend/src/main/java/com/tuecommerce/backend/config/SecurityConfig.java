    package com.tuecommerce.backend.config;

    import java.util.List;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
    import org.springframework.web.filter.CorsFilter;

    @Configuration
    @EnableWebSecurity
    public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {}) // Usa el CorsFilter definido
            .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/**").permitAll() // ← esto cubre todo tu backend REST
            .anyRequest().authenticated()
            )
    .formLogin(form -> form.disable());
            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder(); // Un buen algoritmo de hashing
        }

        // Configuración CORS para permitir solicitudes desde tu frontend React
       @Bean
       public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.setAllowedOrigins(List.of("http://localhost:3000"));
    config.setAllowedHeaders(List.of("Origin", "Content-Type", "Accept", "Authorization"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 👈 AÑADIDO OPTIONS
    config.setMaxAge(3600L); // Para cachear la preflight

    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
}

    }
